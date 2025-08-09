import { Card } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

export function UpcomingTasks() {
  const tasks = [
    {
      title: "Submit draft to FashionBrand",
      time: "Today, 3:00 PM",
      priority: "high",
      type: "deadline",
    },
    {
      title: "Client call with TechCorp",
      time: "Tomorrow, 10:00 AM",
      priority: "medium",
      type: "meeting",
    },
    {
      title: "Review StartupXYZ feedback",
      time: "Friday, 2:00 PM",
      priority: "low",
      type: "review",
    },
    {
      title: "Project kickoff - BeautyBrand",
      time: "Next Monday",
      priority: "medium",
      type: "meeting",
    },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Tasks</h3>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div
              className={`w-2 h-2 rounded-full ${
                task.priority === "high" ? "bg-red-400" : task.priority === "medium" ? "bg-amber-400" : "bg-green-400"
              }`}
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{task.title}</p>
              <p className="text-xs text-slate-500">{task.time}</p>
            </div>

            <div className="flex-shrink-0">
              {task.type === "deadline" ? (
                <AlertCircle className="w-4 h-4 text-red-400" />
              ) : task.type === "meeting" ? (
                <Clock className="w-4 h-4 text-amber-400" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
