"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { type WorkflowStep } from "@/lib/workflow-api"

interface EditStepModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (updatedStep: WorkflowStep) => void
  step: WorkflowStep | null
}

export function EditStepModal({ isOpen, onClose, onSave, step }: EditStepModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")

  useEffect(() => {
    if (step) {
      setTitle(step.title)
      setDescription(step.description)
      setDuration(step.duration)
    }
  }, [step])

  const handleSave = () => {
    if (!step) return

    const updatedStep = {
      ...step,
      title,
      description,
      duration,
    }
    onSave(updatedStep)
    onClose()
  }

  // Handle the open state change of the dialog to call our onClose prop
  // when the user closes it via escape key or clicking outside.
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-navy-800 border-navy-700 text-white">
        <DialogHeader>
          <DialogTitle>Edit Step</DialogTitle>
          <DialogDescription className="text-navy-300">
            Make changes to your workflow step here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-navy-300">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3 bg-navy-900 border-navy-600 placeholder:text-navy-400"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right text-navy-300">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 bg-navy-900 border-navy-600 placeholder:text-navy-400"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right text-navy-300">
              Duration
            </Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="col-span-3 bg-navy-900 border-navy-600 placeholder:text-navy-400"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="text-white border-navy-600 hover:bg-navy-700">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-violet-600 hover:bg-violet-700 text-white">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
