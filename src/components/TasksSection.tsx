import { Checkbox, Collapsible } from "radix-ui";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

export interface TasksSectionProps {
  title: string;
}

export const TasksSection = ({ title }: TasksSectionProps) => {
  const [open, setOpen] = useState(true);
  return (
    <Collapsible.Root
      className="max-w-[600px] w-full"
      open={open}
      onOpenChange={setOpen}
    >
      <span className="w-full flex gap-4 items-center py-3 border-b border-stone-300 mb-3">
        <h3 className="text-lg font-semibold text-stone-700">{title}</h3>
        <Collapsible.Trigger>
          {open ? (
            <ChevronUpIcon className="text-stone-500 w-5 h-5" />
          ) : (
            <ChevronDownIcon className="text-stone-500 w-5 h-5" />
          )}
        </Collapsible.Trigger>
      </span>

      <Collapsible.Content className="CollapsibleContent">
        <ul className="flex flex-col gap-2 mb-2">
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </ul>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export const TaskItem = () => {
  return (
    <li className="w-full flex gap-2 p-3 rounded-md border border-stone-200 shadow">
      <Checkbox.Root
        className="w-4 h-4 mt-1 rounded-sm hover:bg-stone-100 border border-stone-200"
        id="checkbox"
      >
        <Checkbox.Indicator>
          <CheckIcon className="text-stone-500" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span className="flex flex-col ">
        <label className="text-stone-700 font-medium" htmlFor="checkbox">
          Task Checkbox
        </label>
        <p className="text-stone-500 text-xs">Task description goes here.</p>
      </span>
    </li>
  );
};
