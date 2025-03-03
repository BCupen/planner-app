import { isEqual } from "date-fns";
import { PageHeader } from "../components/PageHeader";
import { TasksSection } from "../components/TasksSection";
import { useAppSelector } from "../data/hooks";
import { todoState } from "../data/todosSlice";
import { Priority } from "../data/types";

const TodaysTasks = () => {
  const todos = useAppSelector(todoState);

  const todayTodos = todos.filter(
    (todo) =>
      new Date().toDateString() === new Date(todo.dueDate).toDateString()
  );
  return (
    <section className="flex flex-col items-start gap-5">
      <PageHeader
        title="Today's Tasks"
        subText="Here's what we got for today"
      />

      <TasksSection
        title="High Priority"
        todos={todayTodos.filter(
          (todo) =>
            todo.priority === Priority.HIGH ||
            todo.priority === Priority.OVERDUE
        )}
      />

      <TasksSection title="To Be Completed" todos={todayTodos} />
    </section>
  );
};

export default TodaysTasks;
