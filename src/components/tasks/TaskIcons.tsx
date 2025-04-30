import { Pencil1Icon } from "@radix-ui/react-icons";
import { DeleteTask } from "../DeleteTask";

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
