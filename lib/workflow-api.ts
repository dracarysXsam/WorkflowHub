// lib/workflow-api.ts

import { type LucideIcon } from "lucide-react"

// Define the core data structures based on the minimal schema
// In a real app, the LucideIcon type would likely be just a string
// representing the icon's name, stored in the database.
export interface WorkflowStep {
  id: number
  title: string
  icon: string // Name of the Lucide icon
  description: string
  color: string
  duration: string
  automated: boolean
}

export interface Workflow {
  id: string
  name: string
  description: string
  userId: string
  steps: WorkflowStep[]
  // Future fields
  // price: number;
  // templateId: string;
}

export interface User {
  id: string
  name: string
  email: string
}

// --- MOCKED DATABASE ---
// This simulates a database for development purposes.
let mockWorkflows: Workflow[] = [
  {
    id: "wf_1",
    name: "UK Student Visa Process",
    description: "Complete visa application support with document review and interview prep",
    userId: "user_1",
    steps: [
      {
        id: 1,
        title: "Initial Consultation",
        icon: "MessageSquare",
        description: "30-min discovery call",
        color: "bg-violet-500",
        duration: "30 minutes",
        automated: false,
      },
      {
        id: 2,
        title: "Document Collection",
        icon: "Upload",
        description: "Secure document upload",
        color: "bg-emerald-500",
        duration: "2-3 days",
        automated: true,
      },
      {
        id: 3,
        title: "Application Review",
        icon: "FileText",
        description: "Expert application review",
        color: "bg-navy-500",
        duration: "1-2 days",
        automated: false,
      },
      {
        id: 4,
        title: "Interview Preparation",
        icon: "Calendar",
        description: "Mock interview session",
        color: "bg-violet-600",
        duration: "1 hour",
        automated: false,
      },
      {
        id: 5,
        title: "Final Submission",
        icon: "CheckCircle",
        description: "Application submission",
        color: "bg-emerald-600",
        duration: "1 day",
        automated: true,
      },
    ],
  },
]

// --- MOCKED API FUNCTIONS ---
// These functions simulate making API calls to a backend.

const simulateApiLatency = () => new Promise((resolve) => setTimeout(resolve, 300))

export const getWorkflow = async (workflowId: string): Promise<Workflow | undefined> => {
  await simulateApiLatency()
  console.log(`API: Fetching workflow ${workflowId}`)
  return mockWorkflows.find((wf) => wf.id === workflowId)
}

export const addWorkflowStep = async (
  workflowId: string,
  newStepData: Omit<WorkflowStep, "id">,
): Promise<WorkflowStep> => {
  await simulateApiLatency()
  const workflow = mockWorkflows.find((wf) => wf.id === workflowId)
  if (!workflow) {
    throw new Error("Workflow not found")
  }

  const newStep: WorkflowStep = {
    ...newStepData,
    id: Math.max(0, ...workflow.steps.map((s) => s.id)) + 1,
  }

  workflow.steps.push(newStep)
  console.log(`API: Added step "${newStep.title}" to workflow ${workflowId}`)
  return newStep
}

export const updateWorkflowStep = async (workflowId: string, updatedStep: WorkflowStep): Promise<WorkflowStep> => {
  await simulateApiLatency()
  const workflow = mockWorkflows.find((wf) => wf.id === workflowId)
  if (!workflow) {
    throw new Error("Workflow not found")
  }

  const stepIndex = workflow.steps.findIndex((s) => s.id === updatedStep.id)
  if (stepIndex === -1) {
    throw new Error("Step not found")
  }

  workflow.steps[stepIndex] = updatedStep
  console.log(`API: Updated step "${updatedStep.title}" in workflow ${workflowId}`)
  return updatedStep
}

export const deleteWorkflowStep = async (workflowId: string, stepId: number): Promise<{ success: true }> => {
  await simulateApiLatency()
  const workflow = mockWorkflows.find((wf) => wf.id === workflowId)
  if (!workflow) {
    throw new Error("Workflow not found")
  }

  const initialLength = workflow.steps.length
  workflow.steps = workflow.steps.filter((s) => s.id !== stepId)

  if (workflow.steps.length === initialLength) {
    throw new Error("Step not found to delete")
  }

  console.log(`API: Deleted step with id ${stepId} from workflow ${workflowId}`)
  return { success: true }
}

export const reorderWorkflowSteps = async (workflowId: string, orderedStepIds: number[]): Promise<WorkflowStep[]> => {
  await simulateApiLatency()
  const workflow = mockWorkflows.find((wf) => wf.id === workflowId)
  if (!workflow) {
    throw new Error("Workflow not found")
  }

  const newSteps: WorkflowStep[] = []
  const stepMap = new Map(workflow.steps.map((step) => [step.id, step]))

  for (const id of orderedStepIds) {
    const step = stepMap.get(id)
    if (step) {
      newSteps.push(step)
    }
  }

  if (newSteps.length !== workflow.steps.length) {
    throw new Error("Mismatch in step IDs during reorder")
  }

  workflow.steps = newSteps
  console.log(`API: Reordered steps for workflow ${workflowId}`)
  return workflow.steps
}
