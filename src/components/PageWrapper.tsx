import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Calendar } from "./Calendar";
const PageWrapper = () => {
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
