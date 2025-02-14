import { Sidebar } from "./components/Sidebar"
import { ThemeSwitcher } from "./components/ThemeSwitcher"
import Today from "./pages/Today"

function App() {

  return (
    <div className="w-full flex">
      <Sidebar />

      <main className="w-full min-h-dvh p-4 md:p-12 bg-background">
        <Today />
      </main>

      <ThemeSwitcher />
    </div>
  )
}

export default App
