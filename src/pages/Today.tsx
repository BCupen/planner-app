import { TasksSection } from "../components/TasksSection"

const Today = () => {
  return (
    <section className="flex flex-col items-start gap-6">
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-stone-800">Today's Tasks</h2>
            <p className="text-stone-500 text-sm font-medium">5 tasks remaining</p>
        </div>

        <TasksSection title="High Priority" />
        
    </section>
  )
}

export default Today