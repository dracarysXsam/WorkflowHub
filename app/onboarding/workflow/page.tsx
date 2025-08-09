"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Plus,
  ArrowRight,
  Settings,
  FileText,
  Calendar,
  CheckCircle,
  MessageSquare,
  Upload,
  Zap,
  Users,
  Star,
} from "lucide-react"

export default function WorkflowBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [workflowName, setWorkflowName] = useState("")
  const [isCustom, setIsCustom] = useState(false)

  const templates = [
    {
      id: "visa-consulting",
      name: "UK Student Visa Process",
      description: "Complete visa application support with document review and interview prep",
      steps: 5,
      duration: "4-6 weeks",
      price: "$1,200",
      icon: FileText,
      color: "from-violet-500 to-violet-600",
      popular: true,
    },
    {
      id: "business-coaching",
      name: "Business Strategy Intensive",
      description: "90-day business transformation with weekly coaching calls",
      steps: 6,
      duration: "12 weeks",
      price: "$2,500",
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
      popular: false,
    },
    {
      id: "brand-audit",
      name: "Complete Brand Audit",
      description: "Comprehensive brand analysis with actionable recommendations",
      steps: 4,
      duration: "2-3 weeks",
      price: "$800",
      icon: Star,
      color: "from-navy-500 to-navy-600",
      popular: false,
    },
  ]

  const workflowSteps = [
    {
      id: 1,
      title: "Initial Consultation",
      icon: MessageSquare,
      description: "30-min discovery call",
      color: "bg-violet-500",
    },
    {
      id: 2,
      title: "Document Collection",
      icon: Upload,
      description: "Secure document upload",
      color: "bg-emerald-500",
    },
    {
      id: 3,
      title: "Application Review",
      icon: FileText,
      description: "Expert application review",
      color: "bg-navy-500",
    },
    {
      id: 4,
      title: "Interview Preparation",
      icon: Calendar,
      description: "Mock interview session",
      color: "bg-violet-600",
    },
    {
      id: 5,
      title: "Final Submission",
      icon: CheckCircle,
      description: "Application submission",
      color: "bg-emerald-600",
    },
  ]

  const handleCreateWorkflow = () => {
    // Navigate to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-violet-900 to-navy-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Workflow Builder</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Create Your First Workflow</h1>
          <p className="text-navy-300 max-w-2xl mx-auto">
            Choose from our proven templates or build a custom workflow from scratch. Each workflow becomes a shareable
            link you can add to your bio.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Choose a Template</h2>
              <Button
                variant="outline"
                onClick={() => setIsCustom(true)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Build Custom
              </Button>
            </div>

            <div className="grid gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`p-6 cursor-pointer transition-all border-2 ${
                    selectedTemplate === template.id
                      ? "border-violet-400 bg-white/15"
                      : "border-white/20 bg-white/10 hover:bg-white/15"
                  } backdrop-blur-sm`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-xl flex items-center justify-center`}
                      >
                        <template.icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-white">{template.name}</h3>
                          {template.popular && (
                            <span className="px-2 py-1 bg-violet-500 text-white text-xs rounded-full">Popular</span>
                          )}
                        </div>
                        <p className="text-navy-300 text-sm mb-3">{template.description}</p>

                        <div className="flex items-center space-x-4 text-sm text-navy-300">
                          <span>{template.steps} steps</span>
                          <span>•</span>
                          <span>{template.duration}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-semibold">{template.price}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedTemplate === template.id ? "border-violet-400 bg-violet-400" : "border-white/30"
                      }`}
                    >
                      {selectedTemplate === template.id && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Custom Workflow Name */}
            {selectedTemplate && (
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <h3 className="font-semibold text-white mb-4">Customize Your Workflow</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Workflow Name</label>
                    <Input
                      placeholder="Give your workflow a unique name..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-navy-300"
                      value={workflowName}
                      onChange={(e) => setWorkflowName(e.target.value)}
                    />
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Workflow Preview */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="font-semibold text-white mb-4">Workflow Preview</h3>

              {selectedTemplate ? (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-1">
                      {workflowName || templates.find((t) => t.id === selectedTemplate)?.name}
                    </h4>
                    <p className="text-navy-300 text-sm">
                      {templates.find((t) => t.id === selectedTemplate)?.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {workflowSteps.map((step, index) => (
                      <div key={step.id} className="relative">
                        <div className="flex items-center space-x-3 p-3 bg-navy-800/50 rounded-lg">
                          <div className={`w-8 h-8 ${step.color} rounded-lg flex items-center justify-center`}>
                            <step.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-white text-sm">{step.title}</div>
                            <div className="text-navy-300 text-xs">{step.description}</div>
                          </div>
                        </div>

                        {index < workflowSteps.length - 1 && (
                          <div className="absolute left-7 top-12 w-0.5 h-3 bg-gradient-to-b from-navy-400 to-violet-400" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-navy-300">Estimated completion</span>
                      <span className="text-white font-medium">
                        {templates.find((t) => t.id === selectedTemplate)?.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-navy-400" />
                  </div>
                  <p className="text-navy-300">Select a template to see the preview</p>
                </div>
              )}
            </Card>

            {selectedTemplate && (
              <Button
                onClick={handleCreateWorkflow}
                className="w-full bg-gradient-to-r from-violet-500 to-emerald-500 hover:from-violet-600 hover:to-emerald-600 text-white py-3"
              >
                Create Workflow
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
