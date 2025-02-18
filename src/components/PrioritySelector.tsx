import { BookmarkFilledIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Select } from "radix-ui";
import { Priority } from "../data/types";

interface PrioritySelectorProps {
  value: Priority;
  onChange: (value: Priority) => void;
}

export const PrioritySelector = ({
  value,
  onChange,
}: PrioritySelectorProps) => {
  const getPriorityColor = (p: Priority) => {
    console.log(value);
    switch (p) {
      case Priority.LOW:
        return "text-blue-600";
      case Priority.MEDIUM:
        return "text-orange-600";
      case Priority.HIGH:
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="flex gap-1 items-center p-1 focus:outline-none border border-subtle rounded text-xs">
        <Select.Value placeholder="Priority">
          <BookmarkFilledIcon
            className={`${getPriorityColor(value)} w-4 h-4`}
          />
        </Select.Value>
        <Select.Icon>
          <ChevronDownIcon className="text-subtle w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-sidebar" position="popper" sideOffset={3}>
          <Select.Viewport className="p-1 rounded-md border border-subtle">
            <Select.Group className="flex flex-col gap-1">
              <Select.Item
                value={Priority.LOW}
                className="flex gap-2 items-center text-subtle p-1 text-xs cursor-pointer"
              >
                <BookmarkFilledIcon className="text-blue-600" />
                <Select.ItemText>Low</Select.ItemText>
              </Select.Item>
              <Select.Item
                value={Priority.MEDIUM}
                className="flex gap-2 items-center text-subtle p-1 text-xs cursor-pointer"
              >
                <BookmarkFilledIcon className="text-orange-600" />
                <Select.ItemText>Medium</Select.ItemText>
              </Select.Item>
              <Select.Item
                value={Priority.HIGH}
                className="flex gap-2 items-center text-subtle p-1 text-xs cursor-pointer"
              >
                <BookmarkFilledIcon className="text-red-600" />
                <Select.ItemText>High</Select.ItemText>
              </Select.Item>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
