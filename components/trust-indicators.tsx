import { Shield, Award, Lock, Star, CheckCircle, TrendingUp, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

export function TrustIndicators() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Business Coach • $180K ARR",
      content:
        "WorkflowHub transformed my coaching practice. I went from chaotic client management to systematic growth. My revenue doubled in 6 months.",
      rating: 5,
      avatar: "/coach-testimonial.png",
      metric: "300% ROI",
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Consultant • $95K ARR",
      content:
        "The workflow automation saved me 20 hours per week. I can now focus on high-value strategy while the system handles everything else.",
      rating: 5,
      avatar: "/consultant-testimonial.png",
      metric: "20hrs/week saved",
    },
    {
      name: "Elena Rodriguez",
      role: "Brand Strategist • $240K ARR",
      content:
        "My clients love the professional experience. The automated workflows make me look like I have a full team behind me.",
      rating: 5,
      avatar: "/strategist-testimonial.png",
      metric: "98% client satisfaction",
    },
  ]

  const trustBadges = [
    {
      icon: Shield,
      label: "Enterprise Security",
      description: "Bank-level encryption & SOC 2 compliance",
      color: "from-navy-600 to-navy-700",
    },
    {
      icon: Award,
      label: "Verified Success",
      description: "15,000+ successful workflows completed",
      color: "from-violet-600 to-violet-700",
    },
    {
      icon: TrendingUp,
      label: "Proven Results",
      description: "Average 240% revenue increase in 12 months",
      color: "from-emerald-600 to-emerald-700",
    },
    {
      icon: Zap,
      label: "Lightning Fast",
      description: "99.9% uptime with instant sync",
      color: "from-violet-500 to-emerald-500",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy-900 via-violet-900 to-navy-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-semibold text-white/90 border border-white/20">
            <Shield className="w-4 h-4 mr-2" />
            Trusted by Industry Leaders
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Built for{" "}
            <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Professional Success
            </span>
          </h2>

          <p className="text-xl text-navy-200 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful creators who've systematized their influence into thriving businesses
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {trustBadges.map((badge, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-2xl transition-all duration-300 border-navy-700 bg-white/5 backdrop-blur-sm group hover:bg-white/10"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${badge.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
              >
                <badge.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{badge.label}</h3>
              <p className="text-sm text-navy-300 leading-relaxed">{badge.description}</p>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div className="space-y-8 mb-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Real Results from Real Creators</h3>
            <p className="text-navy-200 text-lg">See how WorkflowHub transformed their businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-2xl transition-all duration-300 border-navy-700 bg-white/10 backdrop-blur-sm group hover:bg-white/15"
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-violet-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-white leading-relaxed font-medium">"{testimonial.content}"</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full border-2 border-violet-400"
                      />
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-navy-300">{testimonial.role}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-400">{testimonial.metric}</div>
                      <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mt-1" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-8 px-8 py-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-white">
              <Shield className="w-6 h-6 text-emerald-400" />
              <span className="font-semibold">SOC 2 Type II</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex items-center space-x-2 text-white">
              <Lock className="w-6 h-6 text-violet-400" />
              <span className="font-semibold">256-bit SSL</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex items-center space-x-2 text-white">
              <Award className="w-6 h-6 text-emerald-400" />
              <span className="font-semibold">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
