import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, MessageCircle, Calendar } from "lucide-react"

export function ProjectsGrid() {
  const projects = [
    {
      id: 1,
      title: "Brand Awareness Campaign",
      client: "TechCorp Inc.",
      status: "In Progress",
      progress: 75,
      dueDate: "2024-01-15",
      budget: "$2,500",
      avatar: "/abstract-tech-logo.png",
    },
    {
      id: 2,
      title: "Product Launch Content",
      client: "FashionBrand",
      status: "Review",
      progress: 90,
      dueDate: "2024-01-12",
      budget: "$1,800",
      avatar: "/abstract-fashion-logo.png",
    },
    {
      id: 3,
      title: "Social Media Strategy",
      client: "StartupXYZ",
      status: "Planning",
      progress: 25,
      dueDate: "2024-01-20",
      budget: "$3,200",
      avatar: "/abstract-startup-logo.png",
    },
    {
      id: 4,
      title: "Influencer Collaboration",
      client: "BeautyBrand",
      status: "In Progress",
      progress: 60,
      dueDate: "2024-01-18",
      budget: "$2,100",
      avatar: "/beauty-brand-logo.png",
    },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Active Projects</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border border-slate-100 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img src={project.avatar || "/placeholder.svg"} alt={project.client} className="w-10 h-10 rounded-lg" />
                <div>
                  <h3 className="font-semibold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-500">{project.client}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    project.status === "In Progress" ? "default" : project.status === "Review" ? "secondary" : "outline"
                  }
                >
                  {project.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Progress</span>
                <span className="text-slate-900 font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-slate-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due {project.dueDate}
                  </div>
                  <div className="font-semibold text-slate-900">{project.budget}</div>
                </div>

                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
