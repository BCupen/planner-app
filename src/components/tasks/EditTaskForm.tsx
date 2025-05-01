import { useState, FormEvent } from "react";
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from "../../data/api/todoApiSlice";
import { Todo, InputFieldState, Priority } from "../../data/types";
import { DatePicker } from "../DatePicker";
import { PrioritySelector } from "../PrioritySelector";
import { validators } from "../../utils";

interface EditTaskFormProps {
  todo: Todo;
  setShow: (value: boolean) => void;
  create?: boolean;
}

export const EditTaskForm = ({
  todo,
  setShow,
  create = false,
}: EditTaskFormProps) => {
  const { validateTitle } = validators;
  const [tempTodo, setTempTodo] = useState(todo);

  const [todoTitle, setTodoTitle] = useState<InputFieldState>({
    value: todo.title,
    hasError: false,
    errorMessage: "",
  });
  const [todoDescription, setTodoDescription] = useState<InputFieldState>({
    value: todo.description,
    hasError: false,
    errorMessage: "",
  });

  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const isButtonDisabled =
    todoTitle.hasError || todoDescription.hasError || !todoTitle.value;

  const handlePriorityChange = (value: Priority) => {
    setTempTodo((prev) => {
      return {
        ...prev,
        priority: value,
      };
    });
  };

  const handleDueDateChange = (value: Date) => {
    setTempTodo((prev) => {
      return {
        ...prev,
        dueDate: value.toISOString(),
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateTodo({
        todoId: todo._id || "",
        updatedTodo: tempTodo,
      });
      console.log(response);
      setShow(false);
    } catch (error) {
      console.log(`Error:${error}`);
    }
  };

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = createTodo(tempTodo).unwrap();
      console.log(response);
      setShow(false);
    } catch (error) {
      console.log(`Error:${error}`);
    }
  };

  return (
    <form
      className="w-full flex flex-col items-start gap-2 text-text-1"
      onSubmit={create ? (e) => handleCreate(e) : (e) => handleSubmit(e)}
    >
      <div className="w-full">
        <input
          type="text"
          className="w-full bg-transparent focus:outline-none font-semibold"
          placeholder="Do something really important"
          value={tempTodo.title}
          onBlur={() => {
            const validationResult = validateTitle(tempTodo.title);
            setTodoTitle((prev) => {
              return { ...prev, ...validationResult };
            });
          }}
          onChange={(e) => {
            setTodoTitle((prev) => {
              return { ...prev, value: e.target.value };
            });
            setTempTodo((prev) => {
              return { ...prev, title: e.target.value };
            });
          }}
        />
        {todoTitle.hasError && (
          <p className="text-red-500 text-xs">{todoTitle.errorMessage}</p>
        )}
      </div>

      <div className="w-full">
        <textarea
          className="w-full bg-transparent focus:outline-none h-12 resize-none font-medium text-text-2"
          placeholder="A description for something really important"
          value={tempTodo.description}
          onBlur={() => {
            const validationResult = validateTitle(tempTodo.description);
            setTodoDescription((prev) => {
              return { ...prev, ...validationResult };
            });
          }}
          onChange={(e) => {
            setTodoDescription((prev) => {
              return { ...prev, value: e.target.value };
            });
            setTempTodo((prev) => {
              return { ...prev, description: e.target.value };
            });
          }}
        />
        {todoDescription.hasError && (
          <p className="text-red-500 text-xs">{todoDescription.errorMessage}</p>
        )}
      </div>

      <div className="flex gap-3">
        <DatePicker
          value={new Date(tempTodo.dueDate)}
          onChange={handleDueDateChange}
        />
        <PrioritySelector
          value={tempTodo.priority}
          onChange={handlePriorityChange}
        />
      </div>
      <span className="w-full flex justify-end gap-2">
        <button
          onClick={() => setShow(false)}
          className="bg-sidebar border border-subtle rounded-md text-subtle text-sm p-1 hover:bg-subtle hover:text-sidebar"
        >
          Cancel
        </button>
        <button
          disabled={isButtonDisabled}
          type="submit"
          className="bg-primary rounded-md text-sm py-1 px-2 hover:bg-transparent border border-primary hover:text-primary disabled:bg-subtle disabled:text-sidebar transition-all duration-100 disabled:cursor-not-allowed disabled:border-subtle"
        >
          Save
        </button>
      </span>
    </form>
  );
};
