import { Routes, Route } from "react-router";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import AllTasks from "./pages/AllTasks";
import "react-day-picker/style.css";
import TodaysTasks from "./pages/TodaysTasks";
import WeeklyTasks from "./pages/WeeklyTasks";
import SpecificDateTasks from "./pages/SpecificDateTasks";
import { useGetTodosQuery } from "./data/api/todoApiSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./data/hooks";
import { setTodos } from "./data/todosSlice";
import { useSetTodosPriority } from "./hooks/SetTodoPriority";
import Login from "./pages/Login";
import PageWrapper from "./components/PageWrapper";
import Signup from "./pages/Signup";

function App() {
  const { data: todos, isSuccess, isLoading } = useGetTodosQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading || !todos) return;
    dispatch(setTodos(todos));
  }, [todos]);

  useSetTodosPriority(todos, isSuccess);

  return (
    <div className="w-full flex overflow-x-hidden">
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Todo Routes */}
        <Route path="/tasks" element={<PageWrapper />}>
          <Route index element={<AllTasks />} />
          <Route path="today" element={<TodaysTasks />} />
          <Route path="upcoming" element={<WeeklyTasks />} />
          <Route path=":date" element={<SpecificDateTasks />} />
        </Route>
      </Routes>
      <ThemeSwitcher />
    </div>
  );
}

export default App;
