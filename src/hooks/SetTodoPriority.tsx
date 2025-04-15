import { useEffect, useRef } from "react";
import { isAfter, parseISO, startOfDay } from "date-fns";
import { Priority, Todo } from "../data/types";
import { useUpdateTodoMutation } from "../data/api/todoApiSlice";

export const useSetTodosPriority = (
  todos: Todo[] | undefined,
  isSuccess: boolean
) => {
  const hasRun = useRef(false);
  const [updateTodo] = useUpdateTodoMutation();

  useEffect(() => {
    if (!isSuccess || !todos || todos.length === 0 || hasRun.current) return;

    const today = startOfDay(new Date());

    const updateTodos = async () => {
      for (const todo of todos) {
        const due = startOfDay(parseISO(todo.dueDate));
        const isOverdue = isAfter(today, due);

        if (isOverdue && todo.priority !== Priority.OVERDUE) {
          const updated = {
            ...todo,
            priority: Priority.OVERDUE,
          };

          try {
            const response = await updateTodo({
              updatedTodo: updated,
              todoId: updated._id || "",
            });
            console.log("Updated:", response);
          } catch (error) {
            console.error("Error updating todo:", error);
          }
        }
      }

      hasRun.current = true;
    };

    updateTodos();
  }, [todos, isSuccess, updateTodo]);
};
