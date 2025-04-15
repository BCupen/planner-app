import { Routes, Route, Navigate } from "react-router";
import { Sidebar } from "./components/Sidebar";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import AllTasks from "./pages/AllTasks";
import "react-day-picker/style.css";
import TodaysTasks from "./pages/TodaysTasks";
import WeeklyTasks from "./pages/WeeklyTasks";
import { Calendar } from "./components/Calendar";
import SpecificDateTasks from "./pages/SpecificDateTasks";
import { useGetTodosQuery } from "./data/api/todoApiSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./data/hooks";
import { setTodos } from "./data/todosSlice";
import { useSetTodosPriority } from "./hooks/SetTodoPriority";

function App() {
  const { data: todos, isSuccess, isLoading } = useGetTodosQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading || !todos) return;
    dispatch(setTodos(todos));
  }, [todos]);

  useSetTodosPriority(todos, isSuccess);

  return (
    <div className="w-full flex">
      <Sidebar />

      <main className="w-full relative min-h-dvh p-4 md:p-12 bg-background">
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks">
            <Route index element={<AllTasks />} />
            <Route path="today" element={<TodaysTasks />} />
            <Route path="upcoming" element={<WeeklyTasks />} />
            <Route path=":date" element={<SpecificDateTasks />} />
          </Route>
        </Routes>
        <Calendar />
        <ThemeSwitcher />
      </main>
    </div>
  );
}

export default App;
