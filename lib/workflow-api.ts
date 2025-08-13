import { getSupabaseClient } from "./supabase-client"

// --- TYPE DEFINITIONS ---

export interface StepData {
  description?: string
  type?: "form" | "meeting" | "payment" | "custom"
  iconName?: string
  color?: string
}

export interface WorkflowStep {
  id: string
  workflow_id: string
  step_name: string
  step_data: StepData | null
  order_index: number
  created_at: string
}

export interface Workflow {
  id: string
  name: string
  created_at: string
  user_id: string | null
  workflow_steps?: WorkflowStep[]
}

// --- API FUNCTIONS ---

export async function getWorkflows(): Promise<Workflow[]> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("workflows")
    .select("*, workflow_steps (*)")
    .order("created_at", { ascending: false })
    .order("order_index", { referencedTable: "workflow_steps", ascending: true })

  if (error) {
    console.error("Error fetching workflows:", error)
    throw new Error(error.message)
  }
  return data || []
}

export async function getWorkflow(id: string): Promise<Workflow> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("workflows")
    .select("*, workflow_steps (*)")
    .eq("id", id)
    .order("order_index", { referencedTable: "workflow_steps", ascending: true })
    .single()

  if (error) {
    console.error(`Error fetching workflow with id ${id}:`, error)
    throw new Error(`Could not find workflow with ID ${id}.`)
  }
  return data
}

export async function createWorkflow(name: string, user_id?: string): Promise<Workflow> {
  const supabase = getSupabaseClient()
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

export async function updateWorkflow(id: string, name: string): Promise<Workflow> {
  const supabase = getSupabaseClient()
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

export async function deleteWorkflow(id: string): Promise<{ success: true }> {
  const supabase = getSupabaseClient()
  const { error } = await supabase.from("workflows").delete().eq("id", id)
  if (error) {
    console.error("Error deleting workflow:", error)
    throw new Error(error.message)
  }
  return { success: true }
}

export async function createStep(
  workflow_id: string,
  step_name: string,
  step_data: StepData,
): Promise<WorkflowStep> {
  const supabase = getSupabaseClient()
  const { data: maxOrder, error: orderError } = await supabase
    .from("workflow_steps")
    .select("order_index")
    .eq("workflow_id", workflow_id)
    .order("order_index", { ascending: false })
    .limit(1)
    .single()

  if (orderError && orderError.code !== "PGRST116") {
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

export async function updateStep(
  id: string,
  updates: { step_name?: string; step_data?: StepData },
): Promise<WorkflowStep> {
  const supabase = getSupabaseClient()
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

export async function deleteStep(id: string): Promise<{ success: true }> {
  const supabase = getSupabaseClient()
  const { error } = await supabase.from("workflow_steps").delete().eq("id", id)
  if (error) {
    console.error("Error deleting step:", error)
    throw new Error(error.message)
  }
  return { success: true }
}

export async function reorderSteps(updates: { id: string; order_index: number }[]): Promise<{ success: true }> {
  const supabase = getSupabaseClient()
  const { error } = await supabase.from("workflow_steps").upsert(updates)
  if (error) {
    console.error("Error reordering steps:", error)
    throw new Error(error.message)
  }
  return { success: true }
}
