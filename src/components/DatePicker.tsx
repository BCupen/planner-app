import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover } from "radix-ui";

export const DatePicker = () => {
  return (
    <Popover.Root>
      <Popover.Trigger className="flex gap-2 items-center border border-subtle rounded p-1">
        <CalendarIcon className="text-subtle w-4 h-4" />
        <p className="text-text-2 font-medium text-xs">Due Date</p>
      </Popover.Trigger>
    </Popover.Root>
  );
};
