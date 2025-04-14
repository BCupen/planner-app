import { CalendarIcon, Cross1Icon } from "@radix-ui/react-icons";
import { format, isEqual } from "date-fns";
import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useNavigate } from "react-router";

export const Calendar = () => {
  const navigate = useNavigate();
  const selectedDate = new Date();
  const defaultClassNames = getDefaultClassNames();
  const [open, setOpen] = useState(false);

  const handleSelect = (value: Date) => {
    const formatValue = format(value, "yyyy-MM-dd");
    const today = format(new Date(), "yyyy-MM-dd");
    if (isEqual(formatValue, today)) {
      navigate(`/tasks/today`);
    } else {
      navigate(`/tasks/${formatValue}`);
    }
  };

  return (
    <>
      <button
        className="fixed top-0 right-0 m-3 lg:hidden text-primary"
        onClick={() => setOpen(true)}
      >
        <CalendarIcon className="w-7 h-7" />
      </button>
      <section
        className={`z-20 ${
          open ? "flex" : "max-lg:hidden"
        } justify-center max-lg:pt-3 max-lg:w-full max-lg:h-dvh top-0 max-lg:left-0 fixed lg:right-0 bg-sidebar rounded-md border border-subtle lg:mt-2 lg:mr-4`}
      >
        <button
          className="absolute top-0 right-0 lg:hidden text-primary text-lg m-4"
          onClick={() => setOpen(false)}
        >
          <Cross1Icon className="w-7 h-7" />
        </button>

        <DayPicker
          required
          mode="single"
          showOutsideDays
          selected={selectedDate}
          onSelect={handleSelect}
          classNames={{
            root: `${defaultClassNames.root} p-3 max-lg:mt-6`,
            day: `w-9 h-8 text-center text-xs`,
            day_button: `w-9 h-8 text-xs text-text-1 hover:bg-primary rounded-md`,
            caption_label: `${defaultClassNames.caption_label} text-lg text-text-1`,
            selected: `${defaultClassNames.selected} !rounded-md !bg-primary !text-text-1`,
            chevron: `inline-block fill-primary w-6 h-6`,
            month_caption: `flex items-center mx-2 h-9`,
            weekday: `${defaultClassNames.weekday} !text-text-1`,
            nav: `${defaultClassNames.nav} !h-9`,
          }}
        />
      </section>
    </>
  );
};
