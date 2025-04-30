import {
  CheckIcon,
  ExclamationTriangleIcon,
  BookmarkFilledIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "radix-ui";
import { useState } from "react";
import { useUpdateTodoMutation } from "../../data/api/todoApiSlice";
import { Todo, Priority } from "../../data/types";
import { getPriorityColor } from "../../data/utils";
import { TaskIcons } from "./TaskIcons";
import { EditTaskForm } from "./EditTaskForm";

export interface TaskItemProps {
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
