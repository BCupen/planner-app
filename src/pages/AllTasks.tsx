import { TasksSection } from "../components/TasksSection";
import { useAppSelector } from "../data/hooks";
import { todoState } from "../data/todosSlice";

const AllTasks = () => {
  const todos = useAppSelector(todoState);

  return (
    <section className="flex flex-col items-start gap-3">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-text-1">Your Tasks</h2>
        <p className="text-subtle text-sm font-medium">5 tasks remaining</p>
      </div>

      <TasksSection title="High Priority" todos={todos} />
    </section>
  );
};

export default AllTasks;
