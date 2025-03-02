import { useEffect } from "react";
import { TasksSection } from "../components/TasksSection";
import { useAppSelector } from "../data/hooks";
import { todoState } from "../data/todosSlice";
import { Priority } from "../data/types";
import { PageHeader } from "../components/PageHeader";

const AllTasks = () => {
  const todos = useAppSelector(todoState);

  // useEffect(() => {
  //   console.log(todos);
  // }, [todos]);

  return (
    <section className="flex flex-col items-start gap-5">
      <PageHeader
        title="Your Tasks"
        subText={`${todos.length} tasks remaining`}
      />

      <TasksSection
        title="High Priority"
        todos={todos.filter((todo) => todo.priority === Priority.HIGH)}
      />

      <TasksSection
        title="Remaining Tasks"
        todos={todos.filter((todo) => !todo.completed)}
      />
    </section>
  );
};

export default AllTasks;
