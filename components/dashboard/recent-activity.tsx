import { Card } from "@/components/ui/card"
import { MessageCircle, Upload, CheckCircle, DollarSign } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      type: "message",
      title: "New message from TechCorp",
      time: "2 hours ago",
      icon: MessageCircle,
      color: "text-blue-500",
    },
    {
      type: "upload",
      title: "Draft uploaded for FashionBrand",
      time: "4 hours ago",
      icon: Upload,
      color: "text-green-500",
    },
    {
      type: "completion",
      title: "Project completed for StartupXYZ",
      time: "1 day ago",
      icon: CheckCircle,
      color: "text-emerald-500",
    },
    {
      type: "payment",
      title: "Payment received - $2,500",
      time: "2 days ago",
      icon: DollarSign,
      color: "text-amber-500",
    },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900">{activity.title}</p>
              <p className="text-xs text-slate-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
