import { HeroSection } from "@/components/hero-section"
import { WorkflowShowcase } from "@/components/workflow-showcase"
import { HowItWorks } from "@/components/how-it-works"
import { DashboardPreview } from "@/components/dashboard-preview"
import { ClientExperience } from "@/components/client-experience"
import { TrustIndicators } from "@/components/trust-indicators"
import { CTAFooter } from "@/components/cta-footer"
import { Navigation } from "@/components/navigation"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-navy-50/20">
      <Navigation />
      <main>
        <HeroSection />
        <WorkflowShowcase />
        <HowItWorks />
        <DashboardPreview />
        <ClientExperience />
        <TrustIndicators />
        <CTAFooter />
      </main>
    </div>
  )
}
