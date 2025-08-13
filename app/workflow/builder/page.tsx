"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  ArrowLeft,
  DotIcon as DragHandleDots2Icon,
  Trash2,
  Edit,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Import API functions and types
import {
  getWorkflow,
  updateWorkflowStep,
  addWorkflowStep,
  deleteWorkflowStep,
  reorderWorkflowSteps,
  type Workflow,
  type WorkflowStep,
} from "@/lib/workflow-api"
import { EditStepModal } from "@/components/workflow/edit-step-modal"

// Icon mapping from string to component
const iconMap: { [key: string]: LucideIcon } = {
  MessageSquare,
  Upload,
  FileText,
  Calendar,
  CheckCircle,
  Settings,
  Users,
  Star,
  Zap,
}

export default function WorkflowBuilderPage() {
  const router = useRouter()
  const [workflow, setWorkflow] = useState<Workflow | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [workflowName, setWorkflowName] = useState("")
  const [isCustom, setIsCustom] = useState(false)
  const [draggedStep, setDraggedStep] = useState<number | null>(null)

  // State for the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingStep, setEditingStep] = useState<WorkflowStep | null>(null)

  // Fetch initial workflow data
  useEffect(() => {
    // In a real app, you might get the workflow ID from the URL
    const fetchWorkflow = async () => {
      const wf = await getWorkflow("wf_1")
      if (wf) {
        setWorkflow(wf)
        setWorkflowName(wf.name) // Initialize with fetched name
      }
    }
    fetchWorkflow()
  }, [])

  const workflowSteps = workflow?.steps ?? []

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
      category: "Immigration",
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
      category: "Business",
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
      category: "Marketing",
    },
  ]

  const handleCreateWorkflow = async () => {
    if (!workflowName.trim()) return
    // In a real app, this would call a createWorkflow API function
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/dashboard")
  }

  const handleDragStart = (stepId: number) => {
    setDraggedStep(stepId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent, targetId: number) => {
    e.preventDefault()
    if (draggedStep === null || !workflow) return

    const draggedIndex = workflow.steps.findIndex((step) => step.id === draggedStep)
    const targetIndex = workflow.steps.findIndex((step) => step.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1) return

    const newSteps = [...workflow.steps]
    const [draggedItem] = newSteps.splice(draggedIndex, 1)
    newSteps.splice(targetIndex, 0, draggedItem)

    setWorkflow({ ...workflow, steps: newSteps })

    try {
      await reorderWorkflowSteps(
        workflow.id,
        newSteps.map((s) => s.id),
      )
    } catch (error) {
      console.error("Failed to reorder steps:", error)
      // Optional: Revert UI state on API failure
    } finally {
      setDraggedStep(null)
    }
  }

  const addNewStep = async () => {
    if (!workflow) return
    const newStepData = {
      title: "New Step",
      icon: "Settings",
      description: "Add description",
      color: "bg-navy-400",
      duration: "TBD",
      automated: false,
    }
    try {
      const addedStep = await addWorkflowStep(workflow.id, newStepData)
      setWorkflow((prevWorkflow) => {
        if (!prevWorkflow) return null
        return {
          ...prevWorkflow,
          steps: [...prevWorkflow.steps, addedStep],
        }
      })
    } catch (error) {
      console.error("Failed to add step:", error)
      // Here you could show an error toast to the user
    }
  }

  const removeStep = async (stepId: number) => {
    if (!workflow) return
    try {
      await deleteWorkflowStep(workflow.id, stepId)
      setWorkflow((prevWorkflow) => {
        if (!prevWorkflow) return null
        return {
          ...prevWorkflow,
          steps: prevWorkflow.steps.filter((step) => step.id !== stepId),
        }
      })
    } catch (error) {
      console.error("Failed to delete step:", error)
      // Here you could show an error toast to the user
    }
  }

  // Handlers for the edit modal
  const handleOpenEditModal = (step: WorkflowStep) => {
    setEditingStep(step)
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingStep(null)
  }

  const handleSaveStep = async (updatedStep: WorkflowStep) => {
    if (!workflow) return

    try {
      const savedStep = await updateWorkflowStep(workflow.id, updatedStep)
      setWorkflow((prevWorkflow) => {
        if (!prevWorkflow) return null
        return {
          ...prevWorkflow,
          steps: prevWorkflow.steps.map((step) => (step.id === savedStep.id ? savedStep : step)),
        }
      })
    } catch (error) {
      console.error("Failed to update step:", error)
      // Here you could show an error toast to the user
    }

    handleCloseEditModal()
  }

  if (!workflow) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-violet-900 to-navy-800 flex items-center justify-center">
        <p className="text-white text-xl">Loading Workflow Builder...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-violet-900 to-navy-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-white hover:text-violet-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Workflow Builder</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Workflow</h1>
          <p className="text-navy-300 max-w-2xl mx-auto">
            Choose from our proven templates or build a custom workflow from scratch. Each workflow becomes a shareable
            link you can add to your bio.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="lg:col-span-2 space-y-6">
            {!isCustom ? (
              <>
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
                      onClick={() => {
                        setSelectedTemplate(template.id)
                        setWorkflowName(template.name)
                      }}
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
                              {template.popular && <Badge className="bg-violet-500 text-white text-xs">Popular</Badge>}
                              <Badge variant="outline" className="border-white/30 text-white/70 text-xs">
                                {template.category}
                              </Badge>
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
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Custom Workflow Builder</h2>
                  <Button
                    variant="outline"
                    onClick={() => setIsCustom(false)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Templates
                  </Button>
                </div>

                <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                  <h3 className="font-semibold text-white mb-4">Workflow Steps</h3>

                  <div className="space-y-3 mb-6">
                    {workflowSteps.map((step, index) => {
                      const IconComponent = iconMap[step.icon] || Settings
                      return (
                        <div
                          key={step.id}
                          draggable
                          onDragStart={() => handleDragStart(step.id)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, step.id)}
                          className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-move group"
                        >
                          <DragHandleDots2Icon className="w-5 h-5 text-white/50 group-hover:text-white" />

                          <div
                            className={`w-10 h-10 ${step.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-white">{step.title}</h4>
                              {step.automated && <Badge className="bg-emerald-500 text-white text-xs">Auto</Badge>}
                            </div>
                            <p className="text-navy-300 text-sm">{step.description}</p>
                            <p className="text-navy-400 text-xs mt-1">Duration: {step.duration}</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white/70 hover:text-white"
                              onClick={() => handleOpenEditModal(step)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeStep(step.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {index < workflowSteps.length - 1 && (
                            <div className="absolute left-9 top-16 w-0.5 h-4 bg-gradient-to-b from-white/20 to-violet-400/50" />
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <Button
                    onClick={addNewStep}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Step
                  </Button>
                </Card>
              </div>
            )}

            {/* Custom Workflow Name */}
            {(selectedTemplate || isCustom) && (
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

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Pricing</label>
                    <Input
                      placeholder="e.g., $1,200"
                      className="bg-white/10 border-white/20 text-white placeholder:text-navy-300"
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

              {selectedTemplate || isCustom ? (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-1">
                      {workflowName ||
                        (selectedTemplate ? templates.find((t) => t.id === selectedTemplate)?.name : "Custom Workflow")}
                    </h4>
                    <p className="text-navy-300 text-sm">
                      {selectedTemplate
                        ? templates.find((t) => t.id === selectedTemplate)?.description
                        : "Your custom workflow description"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {workflowSteps.map((step, index) => {
                      const IconComponent = iconMap[step.icon] || Settings
                      return (
                        <div key={step.id} className="relative">
                          <div className="flex items-center space-x-3 p-3 bg-navy-800/50 rounded-lg">
                            <div className={`w-8 h-8 ${step.color} rounded-lg flex items-center justify-center`}>
                              <IconComponent className="w-4 h-4 text-white" />
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
                      )
                    })}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-navy-300">Total steps</span>
                      <span className="text-white font-medium">{workflowSteps.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-navy-300">Estimated completion</span>
                      <span className="text-white font-medium">
                        {selectedTemplate ? templates.find((t) => t.id === selectedTemplate)?.duration : "4-6 weeks"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-navy-400" />
                  </div>
                  <p className="text-navy-300">Select a template or build custom to see the preview</p>
                </div>
              )}
            </Card>

            {(selectedTemplate || isCustom) && workflowName && (
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
      <EditStepModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveStep}
        step={editingStep}
      />
    </div>
  )
}
