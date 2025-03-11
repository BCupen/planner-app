import { Routes, Route } from "react-router";
import { Sidebar } from "./components/Sidebar";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import AllTasks from "./pages/AllTasks";
import "react-day-picker/style.css";
import TodaysTasks from "./pages/TodaysTasks";
import WeeklyTasks from "./pages/WeeklyTasks";

function App() {
  return (
    <div className="w-full flex">
      <Sidebar />

      <main className="w-full relative h-dvh overflow-y-scroll p-4 md:p-12 bg-background">
        <Routes>
          <Route index element={<AllTasks />} />
          <Route path="/today" element={<TodaysTasks />} />
          <Route path="/upcoming" element={<WeeklyTasks />} />
        </Routes>
        <ThemeSwitcher />
      </main>
    </div>
  );
}

export default App;
