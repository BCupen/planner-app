import { PageHeader } from "../components/PageHeader";
import { TasksSection } from "../components/TasksSection";
import { useAppSelector } from "../data/hooks";
import { todoState } from "../data/todosSlice";
import { getWeekRange } from "../utils";

const WeeklyTasks = () => {
  const todos = useAppSelector(todoState);

  const week = getWeekRange();

  const weeklyTodos = todos.filter((todo) => week.includes(todo.dueDate));

  return (
    <section className="flex flex-col items-start gap-5">
      <PageHeader title="This Week" subText="Here's what you got this week." />

      <TasksSection title="Upcoming Tasks" todos={weeklyTodos} />
    </section>
  );
};

export default WeeklyTasks;
