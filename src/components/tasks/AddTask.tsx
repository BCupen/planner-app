import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Priority } from "../../data/types";
import { TaskItem } from "./TaskItem";

export const AddTask = () => {
  const [showForm, setShowForm] = useState(false);

  return showForm ? (
    <TaskItem
      todo={{
        title: "",
        description: "",
        completed: false,
        priority: Priority.LOW,
        dueDate: new Date().toISOString(),
      }}
      createMode
      onCreateClose={setShowForm}
    />
  ) : (
    <li>
      <button
        className="w-[115px] shadow rounded-md p-2 flex items-center gap-2 bg-primary border border-primary hover:bg-transparent text-white hover:text-primary transition-all duration-100"
        onClick={() => setShowForm(true)}
      >
        <p className=" text-xs font-semibold">Add new task</p>
        <PlusIcon className="w-4 h-4" />
      </button>
    </li>
  );
};
