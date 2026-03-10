"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap, Eye, EyeOff, ArrowRight, Mail, Lock, User, BookOpen, Github, Chrome, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const examTypes = [
  { id: "jee", label: "JEE", color: "from-orange-500 to-red-500" },
  { id: "neet", label: "NEET", color: "from-green-500 to-emerald-500" },
  { id: "upsc", label: "UPSC", color: "from-blue-500 to-indigo-500" },
  { id: "cat", label: "CAT", color: "from-purple-500 to-pink-500" },
  { id: "gate", label: "GATE", color: "from-cyan-500 to-teal-500" },
  { id: "other", label: "Other", color: "from-gray-500 to-gray-600" },
]

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    exam: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    window.location.href = "/"
  }

  const handleSocialSignup = async (provider: "google" | "github") => {
    setSocialLoading(provider)
    // Simulate OAuth flow - in production this would redirect to OAuth provider
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSocialLoading(null)
    // After social auth, go to step 2 to select exam
    setStep(2)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-primary/20" />
        <div className="absolute inset-0">
          <div className="absolute top-40 right-20 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <Zap className="h-12 w-12 text-primary fill-primary" />
                <div className="absolute inset-0 blur-xl bg-primary/50" />
              </div>
              <span className="text-4xl font-bold tracking-tight">
                <span className="text-primary">E</span>
                <span className="text-foreground">crackerian</span>
              </span>
            </div>
            
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Success Story<br />
              <span className="text-accent">Starts Here.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
              Get personalized study plans, track your progress against toppers, and join a community of ambitious crackers.
            </p>

            <div className="space-y-4">
              <FeatureItem text="AI-powered study recommendations" />
              <FeatureItem text="Real-time progress tracking" />
              <FeatureItem text="Compare with exam toppers" />
              <FeatureItem text="Join study groups & discussions" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Zap className="h-8 w-8 text-primary fill-primary" />
            <span className="text-2xl font-bold">
              <span className="text-primary">E</span>crackerian
            </span>
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
            <CardContent className="p-8">
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <StepIndicator number={1} active={step >= 1} completed={step > 1} />
                <div className={`w-12 h-0.5 ${step > 1 ? "bg-primary" : "bg-border"}`} />
                <StepIndicator number={2} active={step >= 2} completed={step > 2} />
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {step === 1 ? "Create Your Account" : "Choose Your Exam"}
                </h2>
                <p className="text-muted-foreground">
                  {step === 1 ? "Join the community of crackers" : "We'll personalize your experience"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {step === 1 ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-10 h-12 bg-secondary border-border focus:border-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="cracker@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10 h-12 bg-secondary border-border focus:border-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-10 pr-10 h-12 bg-secondary border-border focus:border-primary"
                          required
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">Min. 8 characters</p>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {examTypes.map((exam) => (
                      <motion.button
                        key={exam.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, exam: exam.id })}
                        className={`relative p-4 rounded-xl border-2 transition-all ${
                          formData.exam === exam.id
                            ? "border-primary bg-primary/10"
                            : "border-border bg-secondary hover:border-primary/50"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${exam.color} flex items-center justify-center mb-2 mx-auto`}>
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-semibold text-foreground">{exam.label}</span>
                        {formData.exam === exam.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                          >
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading || (step === 2 && !formData.exam)}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                  ) : step === 1 ? (
                    <>
                      Continue <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    <>
                      Start Cracking <Zap className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                {step === 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="w-full"
                  >
                    Back
                  </Button>
                )}
              </form>

              {step === 1 && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-card text-muted-foreground">or sign up with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-12 border-border hover:bg-secondary"
                      onClick={() => handleSocialSignup("google")}
                      disabled={socialLoading !== null}
                    >
                      {socialLoading === "google" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 border-2 border-muted-foreground/30 border-t-foreground rounded-full"
                        />
                      ) : (
                        <>
                          <Chrome className="h-5 w-5 mr-2" />
                          Google
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-12 border-border hover:bg-secondary"
                      onClick={() => handleSocialSignup("github")}
                      disabled={socialLoading !== null}
                    >
                      {socialLoading === "github" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 border-2 border-muted-foreground/30 border-t-foreground rounded-full"
                        />
                      ) : (
                        <>
                          <Github className="h-5 w-5 mr-2" />
                          GitHub
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}

              <p className="text-center mt-6 text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

function StepIndicator({ number, active, completed }: { number: number; active: boolean; completed: boolean }) {
  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
        completed
          ? "bg-primary text-primary-foreground"
          : active
          ? "bg-primary/20 text-primary border-2 border-primary"
          : "bg-secondary text-muted-foreground"
      }`}
    >
      {completed ? <Check className="h-5 w-5" /> : number}
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center gap-3"
    >
      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
        <Check className="h-4 w-4 text-accent" />
      </div>
      <span className="text-foreground">{text}</span>
    </motion.div>
  )
}
