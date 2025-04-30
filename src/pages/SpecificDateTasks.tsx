import { useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { TasksSection } from "../components/tasks/TasksSection";
import { useAppSelector } from "../data/hooks";
import { todoState } from "../data/todosSlice";
import { useMemo } from "react";
import { format, isEqual } from "date-fns";

const SpecificDateTasks = () => {
  const { date } = useParams();
  const todos = useAppSelector(todoState);
  const datedTodos = useMemo(() => {
    return todos.filter((todo) => {
      const formatDate = format(todo.dueDate, "yyyy-MM-dd");
      return isEqual(date || "", formatDate);
    });
  }, [todos, date]);

  return (
    <section className="flex flex-col items-start gap-5">
      <PageHeader
        title={`${date}`}
        subText="Here are your tasks on this date"
      />

      <TasksSection title="Tasks" todos={datedTodos} />
    </section>
  );
};

export default SpecificDateTasks;
