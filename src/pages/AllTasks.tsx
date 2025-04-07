import { TasksSection } from "../components/TasksSection";
import { Priority, Todo } from "../data/types";
import { PageHeader } from "../components/PageHeader";
import { useGetTodosQuery } from "../data/api/todoApiSlice";
import { useEffect } from "react";

const AllTasks = () => {
  const { data: todos, isLoading } = useGetTodosQuery({});

  useEffect(() => {
    if (isLoading || !todos) return;
    console.log(todos.length);
  }, [todos]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <section className="w-full flex flex-col items-start gap-5">
      <PageHeader
        title="Your Tasks"
        subText={`${todos.length} tasks remaining`}
      />

      <TasksSection
        title="High Priority"
        todos={todos.filter((todo: Todo) => todo.priority === Priority.HIGH)}
      />

      <TasksSection
        title="Remaining Tasks"
        todos={todos.filter((todo: Todo) => !todo.completed)}
      />
    </section>
  );
};

export default AllTasks;
