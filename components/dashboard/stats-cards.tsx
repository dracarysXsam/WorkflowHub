import { Card } from "@/components/ui/card"
import { TrendingUp, DollarSign, Users, Star } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,500",
      change: "+12.5%",
      icon: DollarSign,
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Active Projects",
      value: "8",
      change: "+2 this week",
      icon: TrendingUp,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Total Clients",
      value: "47",
      change: "+5 this month",
      icon: Users,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Avg Rating",
      value: "4.9",
      change: "98% satisfaction",
      icon: Star,
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-green-600 mt-1">{stat.change}</p>
            </div>
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
