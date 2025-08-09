import { Button } from "@/components/ui/button"
import { ArrowRight, Workflow, Sparkles } from "lucide-react"

export function CTAFooter() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-navy-800 via-violet-800 to-navy-900 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24" />
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12" />
          </div>

          <div className="relative space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white/90 text-sm font-semibold border border-white/30">
                <Workflow className="w-4 h-4 mr-2" />
                Transform Your Influence Today
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ready to Build Your
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                  Workflow Empire?
                </span>
              </h2>

              <p className="text-xl text-navy-200 max-w-2xl mx-auto leading-relaxed">
                Join 15,000+ successful creators who've systematized their influence into predictable, scalable revenue
                with WorkflowHub's professional platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-500 to-emerald-500 hover:from-violet-600 hover:to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group px-8 py-4 text-lg font-semibold"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold bg-transparent"
              >
                Book Strategy Call
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/80 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-navy-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-navy-700 rounded-lg flex items-center justify-center">
                <Workflow className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-navy-800 to-violet-700 bg-clip-text text-transparent">
                WorkflowHub
              </span>
            </div>

            <div className="flex items-center space-x-8 text-navy-600">
              <a href="#" className="hover:text-violet-600 transition-colors font-medium">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-violet-600 transition-colors font-medium">
                Terms of Service
              </a>
              <a href="#" className="hover:text-violet-600 transition-colors font-medium">
                Support Center
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-navy-500 text-sm">
            © 2024 WorkflowHub. All rights reserved. Empowering creators to build systematic success.
          </div>
        </footer>
      </div>
    </section>
  )
}
