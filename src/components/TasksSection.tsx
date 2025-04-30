import { Checkbox, Collapsible } from "radix-ui";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
  Pencil1Icon,
  PlusIcon,
  ExclamationTriangleIcon,
  BookmarkFilledIcon,
} from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";
import { Priority, Todo } from "../data/types";
import { PrioritySelector } from "./PrioritySelector";
import { DatePicker } from "./DatePicker";
import { getPriorityColor } from "../data/utils";
import { DeleteTask } from "./DeleteTask";
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from "../data/api/todoApiSlice";

export interface TasksSectionProps {
  title: string;
  todos: Todo[];
}

export const TasksSection = ({ title, todos }: TasksSectionProps) => {
  const [open, setOpen] = useState(true);
  return (
    <Collapsible.Root
      className="max-w-[500px] w-full"
      open={open}
      onOpenChange={setOpen}
    >
      <span className="w-full flex gap-4 items-center py-2 border-b-2 border-primary mb-3">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <Collapsible.Trigger>
          {open ? (
            <ChevronUpIcon className="text-primary w-5 h-5" />
          ) : (
            <ChevronDownIcon className="text-primary w-5 h-5" />
          )}
        </Collapsible.Trigger>
      </span>

      <Collapsible.Content className="CollapsibleContent">
        <ul className="flex flex-col gap-2 mb-2">
          {todos.map((todo, i) => (
            <TaskItem todo={todo} key={i} />
          ))}
          <AddTask />
        </ul>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

interface TaskItemProps {
  todo: Todo;
  createMode?: boolean;
  onCreateClose?: (value: boolean) => void;
}

export const TaskItem = ({
  todo,
  createMode = false,
  onCreateClose,
}: TaskItemProps) => {
  const [active, setActive] = useState(false);
  const [editMode, setEditMode] = useState(createMode);
  const [updateTodo] = useUpdateTodoMutation();

  const handleComplete = async (checked: boolean | "indeterminate") => {
    try {
      const response = await updateTodo({
        updatedTodo: {
          ...todo,
          completed: checked === "indeterminate" ? false : checked,
        },
        todoId: todo._id || "",
      }).unwrap();
      console.log(response);
    } catch (error) {
      console.log(`Error completing todo: ${error}`);
    }
  };

  const handleSetShow = (value: boolean) => {
    setEditMode(value);
    if (onCreateClose) {
      onCreateClose(value);
    }
  };

  return (
    <li
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="w-full flex gap-3 p-2 rounded-md bg-sidebar border border-subtle shadow-md transition-all duration-200"
    >
      {editMode ? (
        <EditTaskForm todo={todo} setShow={handleSetShow} create={createMode} />
      ) : (
        <>
          <Checkbox.Root
            checked={todo.completed}
            onCheckedChange={handleComplete}
            className="w-4 h-4 mt-1 rounded-sm border border-subtle shrink-0"
            id={todo._id}
          >
            <Checkbox.Indicator>
              <CheckIcon className="text-primary" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="flex w-full flex-col ">
            <label className="text-text-2 font-medium" htmlFor={todo._id}>
              {todo.title}
            </label>
            <p className="text-stone-500 text-xs">{todo.description}</p>
          </span>
          <span className="flex items-start gap">
            <TaskIcons
              active={active}
              setEditShow={setEditMode}
              todoId={todo._id || "000"}
            />
            {todo.priority === Priority.OVERDUE ? (
              <ExclamationTriangleIcon className="text-red-800 w-6 h-6 mt-1" />
            ) : (
              <BookmarkFilledIcon
                className={`${getPriorityColor(todo.priority)} w-6 h-6`}
              />
            )}
          </span>
        </>
      )}
    </li>
  );
};

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
  const [tempTodo, setTempTodo] = useState(todo);
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

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
      <input
        type="text"
        className="w-full bg-transparent focus:outline-none font-semibold"
        placeholder="Do something really important"
        value={tempTodo.title}
        onChange={(e) =>
          setTempTodo((prev) => {
            return { ...prev, title: e.target.value };
          })
        }
      />
      <textarea
        className="w-full bg-transparent focus:outline-none h-12 resize-none font-medium text-text-2"
        placeholder="A description for something really important"
        value={tempTodo.description}
        onChange={(e) =>
          setTempTodo((prev) => {
            return { ...prev, description: e.target.value };
          })
        }
      />
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
          type="submit"
          className="bg-primary rounded-md text-sm py-1 px-2 hover:bg-transparent border border-primary hover:text-primary"
        >
          Save
        </button>
      </span>
    </form>
  );
};

interface TaskIconProps {
  active: boolean;
  setEditShow: (value: boolean) => void;
  todoId: string;
}

export const TaskIcons = ({ active, setEditShow, todoId }: TaskIconProps) => {
  return (
    <span className="flex items-center gap-1 p-1">
      <button
        className={`${active ? "block" : "hidden"}`}
        onClick={() => setEditShow(true)}
      >
        <Pencil1Icon className="text-subtle hover:text-primary hover:scale-105 transition-all w-5 h-5" />
      </button>
      <DeleteTask active={active} todoId={todoId} />
    </span>
  );
};

export const AddTask = () => {
  const [showForm, setShowForm] = useState(false);

  return showForm ? (
    <TaskItem
      todo={{
        title: "",
        description: "",
        completed: false,
        priority: Priority.LOW,
        dueDate: new Date().toISOString(),
      }}
      createMode
      onCreateClose={setShowForm}
    />
  ) : (
    <li>
      <button
        className="w-[115px] shadow rounded-md p-2 flex items-center gap-2 bg-primary border border-primary hover:bg-transparent text-white hover:text-primary transition-all duration-100"
        onClick={() => setShowForm(true)}
      >
        <p className=" text-xs font-semibold">Add new task</p>
        <PlusIcon className="w-4 h-4" />
      </button>
    </li>
  );
};
