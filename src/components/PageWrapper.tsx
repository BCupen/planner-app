import { Navigate } from "react-router";
import { Sidebar } from "./sidebar/Sidebar";
import { useAppSelector } from "../data/hooks";
import { userState } from "../data/userSlice";
import { useGetTodosQuery } from "../data/api/todoApiSlice";
import { SidebarProvider } from "./sidebar/SidebarProvider";
import { MainContent } from "./MainContent";

const PageWrapper = () => {
  const { name, email } = useAppSelector(userState);
  const isLoggedIn = !!name && !!email;

  useGetTodosQuery(undefined, {
    skip: !isLoggedIn,
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <SidebarProvider>
      <Sidebar />

      <MainContent />
    </SidebarProvider>
  );
};

export default PageWrapper;
