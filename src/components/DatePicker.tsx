import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Popover } from "radix-ui";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

interface DatePickerProps {
  value: Date;
  onChange: (value: Date) => void;
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const defaultClassNames = getDefaultClassNames();
  return (
    <Popover.Root>
      <Popover.Trigger className="flex gap-2 items-center border border-subtle rounded p-1">
        <CalendarIcon className="text-subtle w-4 h-4" />
        <p className="text-text-2 font-medium text-xs">{format(value, "PP")}</p>
      </Popover.Trigger>
      <Popover.Content
        className="bg-sidebar rounded-md border border-subtle"
        sideOffset={4}
        align="start"
      >
        <DayPicker
          required
          mode="single"
          showOutsideDays
          selected={value}
          onSelect={onChange}
          disabled={{ before: new Date() }}
          classNames={{
            root: `${defaultClassNames.root} p-3`,
            day: `w-6 h-6 text-center text-xs`,
            day_button: `w-6 h-6 text-xs text-text-1 hover:bg-primary rounded-md`,
            caption_label: `${defaultClassNames.caption_label} text-sm text-text-1`,
            selected: `${defaultClassNames.selected} !rounded-md !bg-primary !text-text-1`,
            chevron: `inline-block fill-primary w-4 h-4`,
            month_caption: `h-7`,
            nav: `${defaultClassNames.nav} !h-7`,
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
};
