import { useEffect } from "react";
import { useAppSelector } from "../data/hooks";
import { todoState } from "../data/todosSlice";
import { format } from "date-fns";
import { Priority } from "../data/types";

export const useSetTodosPriority = () => {
  const todos = useAppSelector(todoState);

  useEffect(() => {
    if (!todos) return;
    const today = format(new Date(), "yyyy-MM-dd");

    const updatedTodos = todos.map((todo) => {
      const due = todo.dueDate; // or new Date(todo.dueDate)
      const isOverdue = today > due;

      return {
        ...todo,
        priority: isOverdue ? Priority.OVERDUE : todo.priority,
      };
    });

    console.log(updatedTodos);
  }, [todos]);
};
