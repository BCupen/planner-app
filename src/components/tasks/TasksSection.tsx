import { Collapsible } from "radix-ui";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { TaskItem } from "./TaskItem";
import { AddTask } from "./AddTask";
import { useState } from "react";
import { Todo } from "../../data/types";

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
