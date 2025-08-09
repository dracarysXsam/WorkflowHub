import { Workflow, Users, TrendingUp } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Workflow,
      title: "Design Your Workflow",
      description:
        "Use our visual builder to create custom client journeys. Define every touchpoint from discovery to delivery.",
      color: "from-violet-600 to-violet-700",
      highlight: "Drag & Drop Builder",
    },
    {
      icon: Users,
      title: "Automate Client Management",
      description:
        "Let the system handle client onboarding, communication, and progress tracking while you focus on delivery.",
      color: "from-emerald-600 to-emerald-700",
      highlight: "Smart Automation",
    },
    {
      icon: TrendingUp,
      title: "Scale Your Business",
      description:
        "Track performance, optimize conversion rates, and systematically grow your influence into sustainable revenue.",
      color: "from-navy-600 to-navy-700",
      highlight: "Data-Driven Growth",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-navy-900">From Influence to Income in Three Steps</h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            Transform your personal brand into a systematic, scalable business with our proven methodology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-navy-100 group-hover:border-violet-200 group-hover:-translate-y-2">
                <div className="space-y-6">
                  <div className="relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 px-2 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">
                      {step.highlight}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-navy-900 group-hover:text-violet-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-navy-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-violet-200 to-navy-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
