import { Sidebar } from "./components/Sidebar"
import Today from "./pages/Today"

function App() {

  return (
    <div className="w-full flex">
      <Sidebar />

      <main className="w-full p-4 md:p-12">
        <Today />
      </main>
    </div>
  )
}

export default App
