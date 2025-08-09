import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { MessageCircle, Upload, CheckCircle, Clock, ArrowRight, Star } from "lucide-react"

export function ClientExperience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-navy-900">Premium Client Experience</h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            Your clients experience a seamless, professional journey that builds trust and drives results from day one
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Branded Intake Experience */}
          <Card className="p-6 space-y-6 border-navy-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-violet-700 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-900">Branded Intake Forms</h3>
                <p className="text-sm text-navy-500">Professional onboarding experience</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-navy-50 rounded-lg border border-navy-100">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-navy-700 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">SC</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy-900 text-sm">Sarah Chen Coaching</div>
                    <div className="text-xs text-navy-500">VIP Strategy Session</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-navy-700">What's your biggest challenge?</label>
                    <Textarea placeholder="Describe your current situation..." className="mt-1 text-sm" rows={2} />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-navy-700">Desired outcome</label>
                    <Input placeholder="What success looks like to you..." className="mt-1 text-sm" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-navy-700">Investment level</label>
                    <select className="w-full mt-1 p-2 border border-navy-200 rounded-md text-sm">
                      <option>$2,500 - $5,000</option>
                      <option>$5,000 - $10,000</option>
                      <option>$10,000+</option>
                    </select>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-sm">
                    Submit Application
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Visual Progress Tracking */}
          <Card className="p-6 space-y-6 border-navy-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-900">Visual Progress Tracker</h3>
                <p className="text-sm text-navy-500">Real-time workflow visibility</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-navy-50 rounded-lg border border-navy-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-navy-900 text-sm">Your Strategy Session</h4>
                  <div className="text-xs text-emerald-600 font-medium">Step 3 of 5</div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-600">Overall Progress</span>
                    <span className="text-navy-900 font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div className="space-y-3">
                  {[
                    { phase: "Application Submitted", status: "completed", icon: CheckCircle },
                    { phase: "Initial Review", status: "completed", icon: CheckCircle },
                    { phase: "Strategy Call Scheduled", status: "active", icon: Clock },
                    { phase: "Proposal & Agreement", status: "pending", icon: Clock },
                    { phase: "Project Kickoff", status: "pending", icon: Clock },
                  ].map((phase, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          phase.status === "completed"
                            ? "bg-emerald-100 text-emerald-600"
                            : phase.status === "active"
                              ? "bg-violet-100 text-violet-600 animate-pulse-glow"
                              : "bg-navy-100 text-navy-400"
                        }`}
                      >
                        <phase.icon className="w-3 h-3" />
                      </div>
                      <span
                        className={`text-sm ${
                          phase.status === "completed"
                            ? "text-navy-900 font-medium"
                            : phase.status === "active"
                              ? "text-violet-700 font-medium"
                              : "text-navy-500"
                        }`}
                      >
                        {phase.phase}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-violet-50 rounded-lg border border-violet-100">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-medium text-violet-700">Next: Strategy Call</span>
                  </div>
                  <div className="text-xs text-violet-600 mt-1">Tomorrow at 2:00 PM PST</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Premium Communication */}
          <Card className="p-6 space-y-6 border-navy-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-navy-600 to-navy-700 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-900">Premium Communication</h3>
                <p className="text-sm text-navy-500">Direct access to your expert</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-navy-50 rounded-lg border border-navy-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-navy-700 rounded-full" />
                    <div>
                      <div className="font-semibold text-navy-900 text-sm">Sarah Chen</div>
                      <div className="text-xs text-emerald-600 flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1" />
                        Online now
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-violet-400 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="space-y-3 max-h-32 overflow-y-auto">
                  {[
                    {
                      sender: "Sarah",
                      message:
                        "Great job on completing the intake form! I've reviewed your goals and I'm excited to work together.",
                      time: "2:30 PM",
                      isExpert: true,
                    },
                    {
                      sender: "You",
                      message: "Thank you! I'm looking forward to our strategy session tomorrow.",
                      time: "2:45 PM",
                      isExpert: false,
                    },
                    {
                      sender: "Sarah",
                      message:
                        "I've prepared a custom framework based on your specific challenges. We'll dive deep tomorrow!",
                      time: "3:00 PM",
                      isExpert: true,
                    },
                  ].map((msg, index) => (
                    <div key={index} className={`flex ${msg.isExpert ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-xs p-2 rounded-lg text-xs ${
                          msg.isExpert
                            ? "bg-white text-navy-900 border border-navy-100"
                            : "bg-gradient-to-r from-violet-600 to-navy-700 text-white"
                        }`}
                      >
                        <div>{msg.message}</div>
                        <div className={`text-xs mt-1 ${msg.isExpert ? "text-navy-500" : "text-white/70"}`}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2 mt-4">
                  <Input placeholder="Ask a question..." className="flex-1 text-sm" />
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-violet-600 to-navy-700 hover:from-violet-700 hover:to-navy-800"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mt-3 p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">Response guaranteed within 2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Client Success Metrics */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-br from-violet-50 to-navy-50 border-violet-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Why Clients Choose WorkflowHub Professionals</h3>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { metric: "98%", label: "Client Satisfaction", icon: Star },
                { metric: "2.4x", label: "Faster Results", icon: Clock },
                { metric: "100%", label: "Transparent Process", icon: CheckCircle },
                { metric: "24/7", label: "Platform Access", icon: MessageCircle },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-navy-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-navy-900 mb-1">{stat.metric}</div>
                  <div className="text-sm text-navy-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
