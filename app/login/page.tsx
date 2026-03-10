"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap, Eye, EyeOff, ArrowRight, Mail, Lock, Github, Chrome } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    window.location.href = "/"
  }

  const handleSocialLogin = async (provider: "google" | "github") => {
    setSocialLoading(provider)
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSocialLoading(null)
    // Redirect to dashboard after successful login
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
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
              Crack Your Exams.<br />
              <span className="text-primary">Own Your Future.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
              Join thousands of students crushing JEE, NEET & UPSC with data-driven study strategies.
            </p>

            <div className="flex flex-col gap-4">
              <StatCard number="50K+" label="Active Crackers" />
              <StatCard number="94%" label="Success Rate" />
              <StatCard number="1M+" label="Study Hours Tracked" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, Cracker!</h2>
                <p className="text-muted-foreground">Continue your journey to success</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="cracker@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-secondary border-border focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 bg-secondary border-border focus:border-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                  ) : (
                    <>
                      Start Cracking <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-12 border-border hover:bg-secondary"
                  onClick={() => handleSocialLogin("google")}
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
                  onClick={() => handleSocialLogin("github")}
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

              <p className="text-center mt-6 text-muted-foreground">
                New to Ecrackerian?{" "}
                <Link href="/signup" className="text-primary font-semibold hover:underline">
                  Create account
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      whileHover={{ x: 10 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50 backdrop-blur-sm"
    >
      <div className="text-3xl font-bold text-primary">{number}</div>
      <div className="text-muted-foreground">{label}</div>
    </motion.div>
  )
}
