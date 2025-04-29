import { Navigate, Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Calendar } from "./Calendar";
import { useAppSelector } from "../data/hooks";
import { userState } from "../data/userSlice";
import { useGetTodosQuery } from "../data/api/todoApiSlice";
import { todoState } from "../data/todosSlice";

const PageWrapper = () => {
  const { name, email } = useAppSelector(userState);
  const todos = useAppSelector(todoState);
  const isLoggedIn = !!name && !!email;

  useGetTodosQuery(undefined, {
    skip: !isLoggedIn || todos.length > 0,
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Sidebar />

      <main className="w-full relative min-h-dvh p-4 md:p-12 bg-background">
        <Outlet />
        <Calendar />
      </main>
    </>
  );
};

export default PageWrapper;
