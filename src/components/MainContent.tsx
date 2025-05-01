import { Outlet } from "react-router";
import { Calendar } from "./Calendar";
import { useSidebar } from "./sidebar";

export const MainContent = () => {
  const { isOpen } = useSidebar();
  return (
    <main
      className={`${
        isOpen ? "md:ml-64" : "ml-14"
      } w-full relative min-h-dvh p-4 md:p-12 bg-background transition-all duration-300 ease-linear origin-left`}
    >
      <Outlet />
      <Calendar />
    </main>
  );
};
