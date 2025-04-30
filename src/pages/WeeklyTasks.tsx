import { useMemo } from "react";
import { PageHeader } from "../components/PageHeader";
import { TasksSection } from "../components/tasks/TasksSection";
import { useAppSelector } from "../data/hooks";
import { todoState } from "../data/todosSlice";
import { getWeekRange } from "../utils";
import { format } from "date-fns";

const WeeklyTasks = () => {
  const todos = useAppSelector(todoState);

  const week = useMemo(() => {
    return getWeekRange();
  }, []);

  const weeklyTodos = useMemo(() => {
    return todos.filter((todo) => {
      const formattedDate = format(new Date(todo.dueDate), "yyyy-MM-dd");
      return week.includes(formattedDate);
    });
  }, [todos, week]);

  return (
    <section className="flex flex-col items-start gap-5">
      <PageHeader title="This Week" subText="Here's what you got this week." />

      <TasksSection title="Upcoming Tasks" todos={weeklyTodos} />
    </section>
  );
};

export default WeeklyTasks;
