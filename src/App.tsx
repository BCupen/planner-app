import { Sidebar } from "./components/Sidebar";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import AllTasks from "./pages/AllTasks";

function App() {
  return (
    <div className="w-full flex">
      <Sidebar />

      <main className="w-full relative min-h-dvh p-4 md:p-12 bg-background">
        <AllTasks />
        <ThemeSwitcher />
      </main>
    </div>
  );
}

export default App;
