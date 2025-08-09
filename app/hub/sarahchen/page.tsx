"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  ArrowRight,
  Clock,
  Users,
  CheckCircle,
  Globe,
  Instagram,
  Twitter,
  Linkedin,
  Award,
  Shield,
  MessageCircle,
  FileText,
} from "lucide-react"
import Link from "next/link"

export default function InfluencerHubPage() {
  const workflows = [
    {
      id: "visa",
      title: "UK Student Visa Process",
      description:
        "Complete visa application support with document review, interview preparation, and submission guidance.",
      price: "$1,200",
      duration: "4-6 weeks",
      steps: 5,
      completionRate: 92,
      clients: 127,
      rating: 4.9,
      popular: true,
      features: [
        "Document review & preparation",
        "Mock interview sessions",
        "Application submission support",
        "Ongoing communication",
      ],
      icon: FileText,
      color: "from-violet-500 to-violet-600",
    },
    {
      id: "strategy",
      title: "Business Strategy Intensive",
      description: "90-day business transformation program with weekly coaching calls and personalized action plans.",
      price: "$2,500",
      duration: "12 weeks",
      steps: 6,
      completionRate: 100,
      clients: 43,
      rating: 5.0,
      popular: false,
      features: [
        "Weekly 1:1 coaching calls",
        "Custom business strategy",
        "Implementation roadmap",
        "Ongoing support & accountability",
      ],
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "consult",
      title: "Quick Consultation Call",
      description: "Get expert advice and clarity on your specific situation in a focused 30-minute session.",
      price: "$100",
      duration: "30 minutes",
      steps: 2,
      completionRate: 98,
      clients: 284,
      rating: 4.8,
      popular: false,
      features: [
        "Focused 30-minute session",
        "Expert guidance & advice",
        "Actionable next steps",
        "Follow-up resources",
      ],
      icon: MessageCircle,
      color: "from-navy-500 to-navy-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-navy-50/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-navy-100/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/coach-testimonial.png"
                alt="Sarah Chen"
                className="w-16 h-16 rounded-full border-2 border-violet-200"
              />
              <div>
                <h1 className="text-2xl font-bold text-navy-900">Sarah Chen</h1>
                <p className="text-navy-600">Immigration & Business Consultant</p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-violet-500 fill-current" />
                    <span className="text-sm font-medium text-navy-700">4.9 (454 reviews)</span>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">Verified Expert</Badge>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <a href="#" className="text-navy-500 hover:text-violet-600 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-navy-500 hover:text-violet-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-navy-500 hover:text-violet-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-navy-500 hover:text-violet-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bio Section */}
        <Card className="p-8 mb-8 border-navy-100">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Helping ambitious individuals navigate complex processes with confidence
            </h2>
            <p className="text-navy-600 leading-relaxed mb-6">
              With over 8 years of experience in immigration law and business consulting, I've helped 500+ clients
              successfully achieve their goals. My systematic approach ensures you get the guidance and support you need
              at every step of your journey.
            </p>

            <div className="flex items-center justify-center space-x-8 text-sm text-navy-500">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-violet-500" />
                <span>8+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-500" />
                <span>500+ Clients Served</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-navy-500" />
                <span>Licensed Professional</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Services Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">Choose Your Path Forward</h2>
            <p className="text-navy-600 max-w-2xl mx-auto">
              Select the service that best fits your needs. Each option includes personalized support and proven
              systems.
            </p>
          </div>

          <div className="grid gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="p-8 hover:shadow-xl transition-all duration-300 border-navy-100 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${workflow.color} rounded-2xl flex items-center justify-center`}
                    >
                      <workflow.icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-2xl font-bold text-navy-900">{workflow.title}</h3>
                        {workflow.popular && <Badge className="bg-violet-100 text-violet-700">Most Popular</Badge>}
                      </div>
                      <p className="text-navy-600 leading-relaxed mb-4">{workflow.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-3 bg-navy-50 rounded-lg">
                          <div className="text-2xl font-bold text-navy-900">{workflow.price}</div>
                          <div className="text-sm text-navy-500">Investment</div>
                        </div>
                        <div className="text-center p-3 bg-violet-50 rounded-lg">
                          <div className="text-2xl font-bold text-violet-700">{workflow.duration}</div>
                          <div className="text-sm text-navy-500">Timeline</div>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 rounded-lg">
                          <div className="text-2xl font-bold text-emerald-700">{workflow.completionRate}%</div>
                          <div className="text-sm text-navy-500">Success Rate</div>
                        </div>
                        <div className="text-center p-3 bg-navy-50 rounded-lg">
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="w-4 h-4 text-violet-500 fill-current" />
                            <span className="text-xl font-bold text-navy-900">{workflow.rating}</span>
                          </div>
                          <div className="text-sm text-navy-500">{workflow.clients} clients</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-navy-900 mb-3">What's included:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {workflow.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              <span className="text-navy-600 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-navy-100">
                  <div className="flex items-center space-x-4 text-sm text-navy-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{workflow.steps} steps</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{workflow.clients} completed</span>
                    </div>
                  </div>

                  <Link href={`/intake/${workflow.id}`}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white group-hover:scale-105 transition-transform"
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <Card className="p-8 bg-gradient-to-br from-violet-50 to-navy-50 border-violet-100">
          <div className="text-center">
            <h3 className="text-xl font-bold text-navy-900 mb-6">Why Choose Sarah?</h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-navy-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-navy-900 mb-2">Licensed & Certified</h4>
                <p className="text-navy-600 text-sm">Fully licensed immigration consultant with proven track record</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-navy-900 mb-2">Proven Results</h4>
                <p className="text-navy-600 text-sm">95% success rate with transparent process and regular updates</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-navy-900 mb-2">Personal Support</h4>
                <p className="text-navy-600 text-sm">Direct access to Sarah throughout your entire journey</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
