"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Upload,
  Camera,
  ArrowRight,
  ArrowLeft,
  Check,
  Palette,
  Globe,
  Instagram,
  Twitter,
  Linkedin,
  AlertCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfileSetupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    profileImage: "",
    displayName: "",
    bio: "",
    expertise: "",
    niche: "",
    website: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    brandColor: "#7c3aed",
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const niches = [
    { id: "immigration", label: "Immigration & Visa Services", popular: true },
    { id: "business", label: "Business Consulting", popular: true },
    { id: "education", label: "Education Consulting", popular: false },
    { id: "marketing", label: "Marketing & Branding", popular: false },
    { id: "coaching", label: "Life & Career Coaching", popular: true },
    { id: "finance", label: "Financial Planning", popular: false },
    { id: "health", label: "Health & Wellness", popular: false },
    { id: "other", label: "Other", popular: false },
  ]

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!profileData.displayName.trim()) {
        newErrors.displayName = "Display name is required"
      }
      if (!profileData.bio.trim()) {
        newErrors.bio = "Bio is required"
      }
      if (!profileData.expertise.trim()) {
        newErrors.expertise = "Area of expertise is required"
      }
    }

    if (step === 2) {
      if (!profileData.niche) {
        newErrors.niche = "Please select your niche"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (!validateStep(currentStep)) return

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData({ ...profileData, profileImage: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-violet-900 to-navy-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Profile Setup</span>
          </div>

          <div className="space-y-2 mb-6">
            <Progress value={progress} className="h-2 bg-white/20" />
            <p className="text-navy-300 text-sm">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>

        <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Let's set up your profile</h2>
                <p className="text-navy-300">This is how clients will see you on your workflow hub</p>
              </div>

              {/* Profile Image Upload */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-violet-500 to-navy-600 rounded-full flex items-center justify-center overflow-hidden">
                    {profileData.profileImage ? (
                      <img
                        src={profileData.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-violet-600 transition-colors">
                    <Upload className="w-5 h-5 text-white" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Display Name *</label>
                  <Input
                    placeholder="How should clients address you?"
                    className={`bg-white/10 border-white/20 text-white placeholder:text-navy-300 ${
                      errors.displayName ? "border-red-400" : ""
                    }`}
                    value={profileData.displayName}
                    onChange={(e) => {
                      setProfileData({ ...profileData, displayName: e.target.value })
                      if (errors.displayName) setErrors({ ...errors, displayName: "" })
                    }}
                  />
                  {errors.displayName && (
                    <div className="flex items-center space-x-1 text-red-400 text-sm mt-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.displayName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Professional Bio *</label>
                  <Textarea
                    placeholder="Tell clients about your expertise and what makes you unique..."
                    className={`bg-white/10 border-white/20 text-white placeholder:text-navy-300 min-h-[100px] ${
                      errors.bio ? "border-red-400" : ""
                    }`}
                    value={profileData.bio}
                    onChange={(e) => {
                      setProfileData({ ...profileData, bio: e.target.value })
                      if (errors.bio) setErrors({ ...errors, bio: "" })
                    }}
                  />
                  {errors.bio && (
                    <div className="flex items-center space-x-1 text-red-400 text-sm mt-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.bio}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Area of Expertise *</label>
                  <Input
                    placeholder="e.g., Business Coaching, Immigration Consulting, Marketing Strategy"
                    className={`bg-white/10 border-white/20 text-white placeholder:text-navy-300 ${
                      errors.expertise ? "border-red-400" : ""
                    }`}
                    value={profileData.expertise}
                    onChange={(e) => {
                      setProfileData({ ...profileData, expertise: e.target.value })
                      if (errors.expertise) setErrors({ ...errors, expertise: "" })
                    }}
                  />
                  {errors.expertise && (
                    <div className="flex items-center space-x-1 text-red-400 text-sm mt-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.expertise}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Choose your niche</h2>
                <p className="text-navy-300">This helps us recommend the best workflow templates for you</p>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-4 block">Select your primary niche *</label>
                <RadioGroup
                  value={profileData.niche}
                  onValueChange={(value) => {
                    setProfileData({ ...profileData, niche: value })
                    if (errors.niche) setErrors({ ...errors, niche: "" })
                  }}
                  className="space-y-3"
                >
                  {niches.map((niche) => (
                    <div
                      key={niche.id}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <RadioGroupItem value={niche.id} id={niche.id} className="border-white/30" />
                      <Label htmlFor={niche.id} className="flex-1 text-white cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>{niche.label}</span>
                          {niche.popular && (
                            <span className="px-2 py-1 bg-violet-500 text-white text-xs rounded-full">Popular</span>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.niche && (
                  <div className="flex items-center space-x-1 text-red-400 text-sm mt-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.niche}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Connect your social presence (optional)</h3>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </label>
                  <Input
                    placeholder="https://yourwebsite.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-navy-300"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block flex items-center">
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                    </label>
                    <Input
                      placeholder="@username"
                      className="bg-white/10 border-white/20 text-white placeholder:text-navy-300"
                      value={profileData.instagram}
                      onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block flex items-center">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </label>
                    <Input
                      placeholder="@username"
                      className="bg-white/10 border-white/20 text-white placeholder:text-navy-300"
                      value={profileData.twitter}
                      onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block flex items-center">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </label>
                    <Input
                      placeholder="profile-url"
                      className="bg-white/10 border-white/20 text-white placeholder:text-navy-300"
                      value={profileData.linkedin}
                      onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Customize your brand</h2>
                <p className="text-navy-300">Choose colors that represent your professional brand</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-white mb-4 block flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    Brand Color
                  </label>

                  <div className="grid grid-cols-6 gap-3 mb-4">
                    {["#7c3aed", "#059669", "#dc2626", "#ea580c", "#0891b2", "#7c2d12", "#be185d", "#4338ca"].map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() => setProfileData({ ...profileData, brandColor: color })}
                          className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                            profileData.brandColor === color ? "border-white scale-110" : "border-white/20"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ),
                    )}
                  </div>

                  <Input
                    type="color"
                    value={profileData.brandColor}
                    onChange={(e) => setProfileData({ ...profileData, brandColor: e.target.value })}
                    className="w-full h-12 bg-white/10 border-white/20"
                  />
                </div>

                {/* Preview */}
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-white font-semibold mb-4">Preview</h3>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden"
                        style={{ backgroundColor: profileData.brandColor }}
                      >
                        {profileData.profileImage ? (
                          <img
                            src={profileData.profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : profileData.displayName ? (
                          profileData.displayName.charAt(0).toUpperCase()
                        ) : (
                          "Y"
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-navy-900">{profileData.displayName || "Your Name"}</div>
                        <div className="text-sm text-navy-500">{profileData.expertise || "Your Expertise"}</div>
                      </div>
                    </div>
                    <p className="text-navy-600 text-sm">
                      {profileData.bio || "Your professional bio will appear here..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="border-white/20 text-white hover:bg-white/10 bg-transparent disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="bg-gradient-to-r from-violet-500 to-emerald-500 hover:from-violet-600 hover:to-emerald-600 text-white disabled:opacity-50"
            >
              {isLoading ? "Setting up..." : currentStep === totalSteps ? "Complete Setup" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
