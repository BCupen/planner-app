import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog } from "radix-ui";
import { useAppDispatch } from "../data/hooks";
import { removeTodo } from "../data/todosSlice";

interface DeleteTaskProps {
  active: boolean;
  todoId: string;
}

export const DeleteTask = ({ active, todoId }: DeleteTaskProps) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(removeTodo(todoId));
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className={`${active ? "block" : "hidden"}`}>
          <TrashIcon className="text-subtle hover:text-primary hover:scale-105 transition-all w-5 h-5" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="z-20 AlertDialogOverlay bg-black bg-opacity-50 fixed inset-0" />
        <AlertDialog.Content className="z-20 AlertDialogContent bg-background border border-subtle rounded-md shadow-md p-5 text-text-1">
          <AlertDialog.Title className="text-lg font-bold">
            Are you sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="font-medium mb-3">
            Are you sure you want to permanently delete this task?
          </AlertDialog.Description>
          <div className="flex gap-5 justify-end">
            <AlertDialog.Cancel asChild>
              <button className="p-2 text-subtle rounded-md hover:underline text-sm">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => handleDelete()}
                className="border border-red-500 bg-red-500 text-white hover:bg-transparent hover:text-red-500 transition-all rounded-md p-2 text-sm"
              >
                Yes, delete account
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
