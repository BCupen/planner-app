import { TasksSection } from "../components/TasksSection";
import { Priority, Todo } from "../data/types";
import { PageHeader } from "../components/PageHeader";
import { useAppSelector } from "../data/hooks";
import { todoState } from "../data/todosSlice";

const AllTasks = () => {
  const todos = useAppSelector(todoState);

  console.log(todos[0]);

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
