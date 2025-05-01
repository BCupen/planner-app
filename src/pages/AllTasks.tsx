import { TasksSection } from "../components/tasks/TasksSection";
import { Priority, Todo } from "../data/types";
import { PageHeader } from "../components/PageHeader";
import { useAppSelector } from "../data/hooks";
import { todoState } from "../data/todosSlice";
import { useMemo } from "react";

const AllTasks = () => {
  const todos = useAppSelector(todoState);

  const uncompletedTodos = useMemo(() => {
    return todos.filter((todo: Todo) => !todo.completed);
  }, [todos]);

  return (
    <section className="w-full flex flex-col items-start gap-5">
      <PageHeader
        title="Your Tasks"
        subText={`${uncompletedTodos.length} tasks remaining`}
      />

      <TasksSection
        title="High Priority"
        todos={uncompletedTodos.filter(
          (todo: Todo) =>
            todo.priority === Priority.HIGH ||
            todo.priority === Priority.OVERDUE
        )}
      />

      <TasksSection title="Remaining Tasks" todos={uncompletedTodos} />

      <TasksSection
        title="Completed Tasks"
        todos={todos.filter((todo: Todo) => todo.completed)}
      />
    </section>
  );
};

export default AllTasks;
