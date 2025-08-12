import { supabase } from "./supabase-client"

// --- TYPE DEFINITIONS ---

// Represents the structure of the `step_data` JSONB column
export interface StepData {
  description?: string
  type?: "form" | "meeting" | "payment" | "custom"
  iconName?: string
  color?: string
}

// Represents a single step, matching the database schema
export interface WorkflowStep {
  id: string // UUID
  workflow_id: string
  step_name: string
  step_data: StepData | null
  order_index: number
  created_at: string
}

// Represents a workflow, with its steps optionally included
export interface Workflow {
  id: string // UUID
  name: string
  created_at: string
  user_id: string | null
  workflow_steps?: WorkflowStep[] // Using the table name for nested results
}

// --- API FUNCTIONS ---

/**
 * Fetches all workflows and their nested steps.
 */
export async function getWorkflows(): Promise<Workflow[]> {
  const { data, error } = await supabase
    .from("workflows")
    .select(
      `
      *,
      workflow_steps (
        *
      )
    `,
    )
    .order("created_at", { ascending: false })
    .order("order_index", { referencedTable: "workflow_steps", ascending: true })

  if (error) {
    console.error("Error fetching workflows:", error)
    throw new Error(error.message)
  }

  return data || []
}

/**
 * Fetches a single workflow by its ID, including its steps.
 * @returns A single workflow object or throws an error if not found.
 */
export async function getWorkflow(id: string): Promise<Workflow> {
  const { data, error } = await supabase
    .from("workflows")
    .select(
      `
      *,
      workflow_steps (
        *
      )
    `,
    )
    .eq("id", id)
    .order("order_index", { referencedTable: "workflow_steps", ascending: true })
    .single()

  if (error) {
    console.error(`Error fetching workflow with id ${id}:`, error)
    throw new Error(`Could not find workflow with ID ${id}.`)
  }

  return data
}

/**
 * Creates a new workflow.
 */
export async function createWorkflow(name: string, user_id?: string): Promise<Workflow> {
  const { data, error } = await supabase
    .from("workflows")
    .insert([{ name, user_id }])
    .select()
    .single()

  if (error || !data) {
    console.error("Error creating workflow:", error)
    throw new Error(error?.message || "Failed to create workflow.")
  }

  return data
}

/**
 * Updates a workflow's name.
 */
export async function updateWorkflow(id: string, name: string): Promise<Workflow> {
  const { data, error } = await supabase
    .from("workflows")
    .update({ name })
    .eq("id", id)
    .select()
    .single()

  if (error || !data) {
    console.error("Error updating workflow:", error)
    throw new Error(error?.message || "Failed to update workflow.")
  }

  return data
}

/**
 * Deletes a workflow and, due to cascade, its steps.
 */
export async function deleteWorkflow(id: string): Promise<{ success: true }> {
  const { error } = await supabase.from("workflows").delete().eq("id", id)

  if (error) {
    console.error("Error deleting workflow:", error)
    throw new Error(error.message)
  }

  return { success: true }
}

/**
 * Creates a new step for a given workflow.
 */
export async function createStep(
  workflow_id: string,
  step_name: string,
  step_data: StepData,
): Promise<WorkflowStep> {
  // Get the current max order_index to append the new step
  const { data: maxOrder, error: orderError } = await supabase
    .from("workflow_steps")
    .select("order_index")
    .eq("workflow_id", workflow_id)
    .order("order_index", { ascending: false })
    .limit(1)
    .single()

  if (orderError && orderError.code !== "PGRST116") {
    // Ignore 'PGRST116' (range not found), which happens if there are no steps yet
    console.error("Error getting max order index:", orderError)
    throw new Error(orderError.message)
  }

  const newOrderIndex = (maxOrder?.order_index ?? -1) + 1

  const { data, error } = await supabase
    .from("workflow_steps")
    .insert([{ workflow_id, step_name, step_data, order_index: newOrderIndex }])
    .select()
    .single()

  if (error || !data) {
    console.error("Error creating step:", error)
    throw new Error(error?.message || "Failed to create step.")
  }

  return data
}

/**
 * Updates a workflow step. Can update step_name and/or step_data.
 */
export async function updateStep(
  id: string,
  updates: { step_name?: string; step_data?: StepData },
): Promise<WorkflowStep> {
  const { data, error } = await supabase
    .from("workflow_steps")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error || !data) {
    console.error("Error updating step:", error)
    throw new Error(error?.message || "Failed to update step.")
  }

  return data
}

/**
 * Deletes a single workflow step.
 */
export async function deleteStep(id: string): Promise<{ success: true }> {
  const { error } = await supabase.from("workflow_steps").delete().eq("id", id)

  if (error) {
    console.error("Error deleting step:", error)
    throw new Error(error.message)
  }

  return { success: true }
}

/**
 * Updates the order of multiple steps in one go.
 */
export async function reorderSteps(updates: { id: string; order_index: number }[]): Promise<{ success: true }> {
  const { error } = await supabase.from("workflow_steps").upsert(updates)

  if (error) {
    console.error("Error reordering steps:", error)
    throw new Error(error.message)
  }

  return { success: true }
}
