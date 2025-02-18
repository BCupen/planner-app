import { Checkbox, Collapsible } from "radix-ui";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
  Pencil1Icon,
  TrashIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { Priority, Todo } from "../data/types";
import { PrioritySelector } from "./PrioritySelector";
import { DatePicker } from "./DatePicker";

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
        </ul>
        <AddTask />
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

interface TaskItemProps {
  todo: Todo;
}

export const TaskItem = ({ todo }: TaskItemProps) => {
  const [active, setActive] = useState(false);
  const [editMode, setEditMode] = useState(true);

  return (
    <li
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="w-full flex gap-3 p-2 rounded-md bg-sidebar border border-subtle shadow-md transition-all duration-200"
    >
      {editMode ? (
        <EditTaskForm todo={todo} setShow={setEditMode} />
      ) : (
        <>
          <Checkbox.Root
            checked={todo.completed}
            className="w-4 h-4 mt-1 rounded-sm border border-subtle shrink-0"
            id={todo.title.replace(" ", "-")}
          >
            <Checkbox.Indicator>
              <CheckIcon className="text-primary" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="flex w-full flex-col ">
            <label
              className="text-text-2 font-medium"
              htmlFor={todo.title.replace(" ", "-")}
            >
              {todo.title}
            </label>
            <p className="text-stone-500 text-xs">{todo.description}</p>
          </span>
          <TaskIcons active={active} setEditShow={setEditMode} />{" "}
        </>
      )}
    </li>
  );
};

interface EditTaskFormProps {
  todo: Todo;
  setShow: (value: boolean) => void;
}

export const EditTaskForm = ({ todo, setShow }: EditTaskFormProps) => {
  const [tempTodo, setTempTodo] = useState(todo);

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
        dueDate: value,
      };
    });
  };

  return (
    <form className="w-full flex flex-col items-start gap-2 text-text-1">
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
        <DatePicker value={tempTodo.dueDate} onChange={handleDueDateChange} />
        <PrioritySelector
          value={tempTodo.priority}
          onChange={handlePriorityChange}
        />
      </div>
      <button onClick={() => setShow(false)}>Close</button>
    </form>
  );
};

interface TaskIconProps {
  active: boolean;
  setEditShow: (value: boolean) => void;
}

export const TaskIcons = ({ active, setEditShow }: TaskIconProps) => {
  return (
    <span className="flex items-center gap-1 p-1">
      <button
        className={`${active ? "block" : "hidden"}`}
        onClick={() => setEditShow(true)}
      >
        <Pencil1Icon className="text-subtle hover:text-primary hover:scale-105 transition-all w-5 h-5" />
      </button>
      <button className={`${active ? "block" : "hidden"}`}>
        <TrashIcon className="text-subtle hover:text-primary hover:scale-105 transition-all w-5 h-5" />
      </button>
    </span>
  );
};

export const AddTask = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        className="shadow rounded-md p-2 flex items-center gap-2 bg-primary hover:border hover:border-primary hover:bg-transparent text-white hover:text-primary transition-all duration-100"
        onClick={() => setShowForm(true)}
      >
        <p className=" text-xs font-semibold">Add new task</p>
        <PlusIcon className="w-4 h-4" />
      </button>
    </>
  );
};
