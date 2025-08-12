-- Seed data for the workflows and workflow_steps tables
-- This script provides initial data for development and testing.

-- Clean up existing data to make the script idempotent
delete from public.workflows;
delete from public.workflow_steps;

-- 1. Create a sample workflow
-- We use a fixed UUID here so we can easily reference it in the application for now.
insert into public.workflows (id, name, user_id)
values ('e9e06183-9216-4339-9634-a43ea8695067', 'Sample Client Onboarding', null);

-- 2. Create steps for the sample workflow
-- The step_data JSONB column is used to store flexible, step-specific metadata
-- including properties needed for rendering the UI.
insert into public.workflow_steps (workflow_id, step_name, order_index, step_data)
values
  (
    'e9e06183-9216-4339-9634-a43ea8695067',
    'Initial Consultation',
    0,
    '{
      "description": "30-min discovery call with the client.",
      "type": "meeting",
      "iconName": "Calendar",
      "color": "bg-violet-600"
    }'
  ),
  (
    'e9e06183-9216-4339-9634-a43ea8695067',
    'Intake Form Submission',
    1,
    '{
      "description": "Client fills out and submits their intake questionnaire.",
      "type": "form",
      "iconName": "FileText",
      "color": "bg-navy-500"
    }'
  ),
  (
    'e9e06183-9216-4339-9634-a43ea8695067',
    'Payment & Project Kick-off',
    2,
    '{
      "description": "Collect initial payment to begin the project.",
      "type": "payment",
      "iconName": "CheckCircle",
      "color": "bg-emerald-600"
    }'
  );
