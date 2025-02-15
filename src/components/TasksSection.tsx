import { Checkbox, Collapsible } from "radix-ui";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { Todo } from "../data/types";
import { TaskEditor } from "./TaskEditor";

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

        <TaskEditor />
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

interface TaskItemProps {
  todo: Todo;
}

export const TaskItem = ({ todo }: TaskItemProps) => {
  const [active, setActive] = useState(false);
  return (
    <li
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="w-full flex gap-3 p-2 rounded-md bg-sidebar border border-subtle shadow-md"
    >
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
      <TaskIcons active={active} />
    </li>
  );
};

interface TaskIconProps {
  active: boolean;
}

export const TaskIcons = ({ active }: TaskIconProps) => {
  return (
    <span className="flex items-center gap-1 p-1">
      <button className={`${active ? "block" : "hidden"}`}>
        <Pencil1Icon className="text-subtle hover:text-primary hover:scale-105 transition-all w-5 h-5" />
      </button>
      <button className={`${active ? "block" : "hidden"}`}>
        <TrashIcon className="text-subtle hover:text-primary hover:scale-105 transition-all w-5 h-5" />
      </button>
    </span>
  );
};
