-- Create the workflows table
create table public.workflows (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamp with time zone default now(),
  user_id uuid -- For now, this is nullable as per instructions
);

-- Create the workflow_steps table
create table public.workflow_steps (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid references public.workflows(id) on delete cascade not null,
  step_name text not null,
  step_data jsonb,
  order_index smallint,
  created_at timestamp with time zone default now()
);

-- Add comments to tables and columns for clarity
comment on table public.workflows is 'Stores the main workflow configurations.';
comment on table public.workflow_steps is 'Stores individual steps belonging to a workflow.';
comment on column public.workflow_steps.step_data is 'Flexible JSONB column to store step-specific data, e.g., UI properties, form fields, meeting links.';
comment on column public.workflow_steps.order_index is 'The display order of the step within a workflow.';


-- Enable Row Level Security for both tables
alter table public.workflows enable row level security;
alter table public.workflow_steps enable row level security;

-- Create temporary development policies to allow all actions for anon role.
-- In a real production environment, you would create more restrictive policies
-- such as: create policy "Users can manage their own workflows" on public.workflows
-- for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Allow all for anon" on public.workflows for all to anon using (true) with check (true);
create policy "Allow all for anon" on public.workflow_steps for all to anon using (true) with check (true);
