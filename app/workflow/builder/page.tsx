"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Plus,
  ArrowLeft,
  Settings,
  FileText,
  Calendar,
  CheckCircle,
  GripVertical as DragHandle,
  Edit,
  Trash2,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import {
  getWorkflow,
  createStep,
  updateStep,
  deleteStep,
  reorderSteps,
  updateWorkflow,
  type Workflow,
  type WorkflowStep,
  type StepData,
} from "@/lib/workflow-api"
import { EditStepModal } from "@/components/workflow/edit-step-modal"

// Maps icon names from the database to actual Lucide components
const iconMap: { [key: string]: LucideIcon } = {
  FileText,
  Calendar,
  CheckCircle,
  Settings,
}

export default function WorkflowBuilderPage() {
  const [workflow, setWorkflow] = useState<Workflow | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [draggedStep, setDraggedStep] = useState<string | null>(null)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingStep, setEditingStep] = useState<WorkflowStep | null>(null)

  // For this task, we'll use the hardcoded ID of our seed workflow.
  const workflowId = "e9e06183-9216-4339-9634-a43ea8695067"

  const fetchWorkflowData = async () => {
    setIsLoading(true)
    try {
      const wf = await getWorkflow(workflowId)
      setWorkflow(wf)
    } catch (error) {
      console.error(error)
      toast.error("Failed to load workflow. Please try refreshing the page.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkflowData()
  }, [])

  const handleDragStart = (stepId: string) => setDraggedStep(stepId)

  const handleDrop = async (targetId: string) => {
    if (draggedStep === null || !workflow?.workflow_steps || draggedStep === targetId) return

    const steps = workflow.workflow_steps
    const draggedIndex = steps.findIndex((step) => step.id === draggedStep)
    const targetIndex = steps.findIndex((step) => step.id === targetId)
    if (draggedIndex === -1 || targetIndex === -1) return

    const newSteps = [...steps]
    const [draggedItem] = newSteps.splice(draggedIndex, 1)
    newSteps.splice(targetIndex, 0, draggedItem)

    // Optimistically update the UI
    setWorkflow({ ...workflow, workflow_steps: newSteps })
    setDraggedStep(null)

    const orderUpdates = newSteps.map((step, index) => ({ id: step.id, order_index: index }))

    try {
      await reorderSteps(orderUpdates)
      toast.success("Workflow order saved!")
    } catch (error) {
      console.error(error)
      // Revert on failure
      setWorkflow({ ...workflow, workflow_steps: steps })
      toast.error("Failed to save new order.")
    }
  }

  const handleNameChange = async (newName: string) => {
    if (!workflow || workflow.name === newName) return
    try {
      await updateWorkflow(workflow.id, newName)
      toast.success("Workflow name updated!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update workflow name.")
    }
  }

  const handleAddNewStep = async () => {
    if (!workflow) return
    const newStepName = "New Step"
    const newStepData: StepData = {
      description: "Click edit to customize.",
      type: "custom",
      iconName: "Settings",
      color: "bg-gray-400",
    }
    try {
      const newStep = await createStep(workflow.id, newStepName, newStepData)
      setWorkflow((prev) => (prev ? { ...prev, workflow_steps: [...(prev.workflow_steps || []), newStep] } : null))
      toast.success("Step added successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to add new step.")
    }
  }

  const handleOpenEditModal = (step: WorkflowStep) => {
    setEditingStep(step)
    setIsEditModalOpen(true)
  }

  const handleSaveStep = async (updates: { step_name?: string; step_data?: StepData }) => {
    if (!editingStep || !workflow) return
    try {
      const updatedStep = await updateStep(editingStep.id, updates)
      setWorkflow((prev) => {
        if (!prev) return null
        return {
          ...prev,
          workflow_steps: (prev.workflow_steps || []).map((s) => (s.id === updatedStep.id ? updatedStep : s)),
        }
      })
      toast.success("Step updated successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to save changes.")
    } finally {
      setIsEditModalOpen(false)
      setEditingStep(null)
    }
  }

  const handleDeleteStep = async (stepId: string) => {
    if (!workflow) return
    const originalSteps = workflow.workflow_steps || []
    const newSteps = originalSteps.filter((step) => step.id !== stepId)
    setWorkflow({ ...workflow, workflow_steps: newSteps }) // Optimistic update
    try {
      await deleteStep(stepId)
      toast.success("Step removed successfully!")
    } catch (error) {
      console.error(error)
      setWorkflow({ ...workflow, workflow_steps: originalSteps }) // Revert
      toast.error("Failed to delete step.")
    }
  }

  if (isLoading) return <div className="p-8 text-center">Loading workflow...</div>
  if (!workflow) return <div className="p-8 text-center text-red-500">Could not load workflow.</div>

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-black flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <Input
            className="text-3xl font-bold border-none shadow-none focus-visible:ring-0 p-0 mt-2 h-auto"
            defaultValue={workflow.name}
            onBlur={(e) => handleNameChange(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {(workflow.workflow_steps || []).map((step) => {
            const Icon = iconMap[step.step_data?.iconName || "Settings"] || Settings
            return (
              <Card
                key={step.id}
                draggable
                onDragStart={() => handleDragStart(step.id)}
                onDrop={() => handleDrop(step.id)}
                onDragOver={(e) => e.preventDefault()}
                className="p-4 flex items-center space-x-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                <DragHandle className="h-5 w-5 text-gray-400 cursor-grab" />
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    step.step_data?.color || "bg-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{step.step_name}</h4>
                  <p className="text-sm text-gray-500">{step.step_data?.description}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenEditModal(step)}>
                    <Edit className="w-4 h-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteStep(step.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        <Button onClick={handleAddNewStep} variant="outline" className="w-full mt-4 border-dashed">
          <Plus className="w-4 h-4 mr-2" />
          Add Step
        </Button>
      </div>

      <EditStepModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveStep}
        step={editingStep}
      />
    </div>
  )
}
