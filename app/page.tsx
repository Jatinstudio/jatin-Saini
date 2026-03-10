"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/ecrackerian/header"
import { SuccessGraph } from "@/components/ecrackerian/success-graph"
import { PomodoroTimer } from "@/components/ecrackerian/pomodoro-timer"
import { TaskTracker } from "@/components/ecrackerian/task-tracker"
import { TopperSecrets } from "@/components/ecrackerian/topper-secrets"
import { CommunityChat } from "@/components/ecrackerian/community-chat"
import { TrendingUp, Target, Clock, Zap } from "lucide-react"

export default function EcrackerianDashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header streak={12} userName="Aspirant" />
      
      <main className={`transition-all duration-300 ${isChatOpen ? "mr-80" : ""}`}>
        {/* Hero Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-8"
        >
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {"Good Evening, "}
              <span className="text-primary">Aspirant</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              {"You're "}
              <span className="text-accent font-medium">35%</span>
              {" closer to your goal than last week. Keep pushing!"}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={<Clock className="h-5 w-5" />}
                label="Study Today"
                value="4.5h"
                trend="+12%"
                color="primary"
              />
              <StatCard
                icon={<Target className="h-5 w-5" />}
                label="Tasks Done"
                value="8/12"
                trend="67%"
                color="accent"
              />
              <StatCard
                icon={<TrendingUp className="h-5 w-5" />}
                label="Weekly Rank"
                value="#124"
                trend="+15"
                color="chart-3"
              />
              <StatCard
                icon={<Zap className="h-5 w-5" />}
                label="Efficiency"
                value="65%"
                trend="+8%"
                color="chart-4"
              />
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Success Graph - Spans 2 columns on large screens */}
              <div className="lg:col-span-2">
                <SuccessGraph />
              </div>

              {/* Pomodoro Timer */}
              <div>
                <PomodoroTimer />
              </div>

              {/* Task Tracker */}
              <div className="lg:col-span-1">
                <TaskTracker />
              </div>

              {/* Topper Secrets - Spans 2 columns */}
              <div className="lg:col-span-2">
                <TopperSecrets />
              </div>
            </div>

            {/* Efficiency Formula */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-accent/10 border border-border"
            >
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Your Success Formula
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 bg-card/50 rounded-xl font-mono">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Efficiency Score</p>
                  <p className="text-3xl font-bold text-primary">65%</p>
                </div>
                <span className="text-2xl text-muted-foreground">=</span>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Your Hours</p>
                  <p className="text-xl font-bold text-accent">5.8h</p>
                </div>
                <span className="text-2xl text-muted-foreground">/</span>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Topper Hours</p>
                  <p className="text-xl font-bold text-foreground">8.9h</p>
                </div>
                <span className="text-2xl text-muted-foreground">×</span>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Consistency</p>
                  <p className="text-xl font-bold text-chart-3">100%</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Increase your study hours by <span className="text-primary font-medium">3.1h</span> daily to match topper performance
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Community Chat Sidebar */}
      <CommunityChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  trend,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  trend: string
  color: string
}) {
  const colorClasses: Record<string, string> = {
    primary: "text-primary bg-primary/10 border-primary/20",
    accent: "text-accent bg-accent/10 border-accent/20",
    "chart-3": "text-chart-3 bg-chart-3/10 border-chart-3/20",
    "chart-4": "text-chart-4 bg-chart-4/10 border-chart-4/20",
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`p-4 rounded-xl border ${colorClasses[color]} backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className={`text-sm font-medium ${colorClasses[color].split(" ")[0]}`}>
          {trend}
        </span>
      </div>
    </motion.div>
  )
}
