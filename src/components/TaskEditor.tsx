import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Dialog } from "radix-ui";

interface TaskEditorProps {
  title?: string;
  description?: string;
}

export const TaskEditor = ({
  title = "Add new task",
  description = "Fill in the details for your new tast",
}: TaskEditorProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="shadow rounded-md p-2 flex items-center gap-2 bg-primary hover:border hover:border-primary hover:bg-transparent text-white hover:text-primary transition-colors duration-100">
          <p className=" text-xs font-semibold">Add new task</p>
          <PlusIcon className="w-4 h-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="fixed top-[5%] right-[2.5%] w-[300px]">
          <div className="w-full flex justify-between items-center">
            <Dialog.Title asChild>
              <h2>{title}</h2>
            </Dialog.Title>
            <Dialog.Close>
              <Cross1Icon />
            </Dialog.Close>
          </div>
          <Dialog.Description>
            <p>{description}</p>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const TaskForm = () => {
  return <form></form>;
};
