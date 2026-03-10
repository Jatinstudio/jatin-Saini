"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Clock, Target, Flame, Brain, Calendar, Award, ChevronRight, ArrowUpRight, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for charts
const weeklyProgress = [
  { day: "Mon", hours: 6, target: 8, efficiency: 85 },
  { day: "Tue", hours: 7.5, target: 8, efficiency: 92 },
  { day: "Wed", hours: 8, target: 8, efficiency: 88 },
  { day: "Thu", hours: 5, target: 8, efficiency: 78 },
  { day: "Fri", hours: 9, target: 8, efficiency: 95 },
  { day: "Sat", hours: 10, target: 10, efficiency: 90 },
  { day: "Sun", hours: 4, target: 6, efficiency: 70 },
]

const monthlyTrend = [
  { week: "Week 1", you: 42, toppers: 56 },
  { week: "Week 2", you: 48, toppers: 58 },
  { week: "Week 3", you: 52, toppers: 55 },
  { week: "Week 4", you: 55, toppers: 57 },
]

const subjectDistribution = [
  { name: "Physics", value: 30, color: "oklch(0.65 0.25 285)" },
  { name: "Chemistry", value: 25, color: "oklch(0.72 0.18 195)" },
  { name: "Mathematics", value: 35, color: "oklch(0.75 0.2 150)" },
  { name: "Biology", value: 10, color: "oklch(0.75 0.15 60)" },
]

const skillRadar = [
  { subject: "Problem Solving", you: 80, topAvg: 90, fullMark: 100 },
  { subject: "Time Mgmt", you: 65, topAvg: 85, fullMark: 100 },
  { subject: "Accuracy", you: 75, topAvg: 88, fullMark: 100 },
  { subject: "Speed", you: 70, topAvg: 82, fullMark: 100 },
  { subject: "Revision", you: 85, topAvg: 92, fullMark: 100 },
  { subject: "Practice", you: 78, topAvg: 95, fullMark: 100 },
]

const streakData = [
  { date: "1", value: 1 }, { date: "2", value: 1 }, { date: "3", value: 1 },
  { date: "4", value: 0 }, { date: "5", value: 1 }, { date: "6", value: 1 },
  { date: "7", value: 1 }, { date: "8", value: 1 }, { date: "9", value: 1 },
  { date: "10", value: 1 }, { date: "11", value: 0 }, { date: "12", value: 1 },
  { date: "13", value: 1 }, { date: "14", value: 1 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-primary fill-primary" />
            <span className="text-2xl font-bold">
              <span className="text-primary">E</span>crackerian
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
            <Link href="/analytics" className="text-primary font-medium">Analytics</Link>
            <Link href="/community" className="text-muted-foreground hover:text-foreground">Community</Link>
            <Link href="/resources" className="text-muted-foreground hover:text-foreground">Resources</Link>
          </nav>
          <Link href="/profile">
            <Button variant="outline" size="sm">Profile</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Analytics</h1>
          <p className="text-muted-foreground">Track your progress and compare with toppers</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Clock}
            label="Total Study Hours"
            value="156h"
            change="+12%"
            positive
            delay={0}
          />
          <StatCard
            icon={Target}
            label="Goals Completed"
            value="28/35"
            change="80%"
            positive
            delay={0.1}
          />
          <StatCard
            icon={Flame}
            label="Current Streak"
            value="14 days"
            change="+3"
            positive
            delay={0.2}
          />
          <StatCard
            icon={Brain}
            label="Efficiency Score"
            value="87%"
            change="+5%"
            positive
            delay={0.3}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-foreground">
                  <span>Weekly Study Hours</span>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Details <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.03 285)" />
                      <XAxis dataKey="day" stroke="oklch(0.65 0.02 285)" />
                      <YAxis stroke="oklch(0.65 0.02 285)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.12 0.015 285)",
                          border: "1px solid oklch(0.22 0.03 285)",
                          borderRadius: "8px",
                          color: "oklch(0.95 0.01 285)",
                        }}
                      />
                      <Bar dataKey="hours" fill="oklch(0.65 0.25 285)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" fill="oklch(0.72 0.18 195)" radius={[4, 4, 0, 0]} opacity={0.5} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">Your Hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent opacity-50" />
                    <span className="text-sm text-muted-foreground">Target</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-foreground">
                  <span>You vs Toppers (Monthly)</span>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Compare <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.03 285)" />
                      <XAxis dataKey="week" stroke="oklch(0.65 0.02 285)" />
                      <YAxis stroke="oklch(0.65 0.02 285)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.12 0.015 285)",
                          border: "1px solid oklch(0.22 0.03 285)",
                          borderRadius: "8px",
                          color: "oklch(0.95 0.01 285)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="toppers"
                        stroke="oklch(0.72 0.18 195)"
                        fill="oklch(0.72 0.18 195)"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="you"
                        stroke="oklch(0.65 0.25 285)"
                        fill="oklch(0.65 0.25 285)"
                        fillOpacity={0.4}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">You</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span className="text-sm text-muted-foreground">Toppers Avg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subject Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Subject Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subjectDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {subjectDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.12 0.015 285)",
                          border: "1px solid oklch(0.22 0.03 285)",
                          borderRadius: "8px",
                          color: "oklch(0.95 0.01 285)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {subjectDistribution.map((subject) => (
                    <div key={subject.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                      <span className="text-sm text-muted-foreground">
                        {subject.name} ({subject.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skill Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Skill Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={skillRadar}>
                      <PolarGrid stroke="oklch(0.22 0.03 285)" />
                      <PolarAngleAxis dataKey="subject" stroke="oklch(0.65 0.02 285)" tick={{ fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="oklch(0.22 0.03 285)" />
                      <Radar
                        name="You"
                        dataKey="you"
                        stroke="oklch(0.65 0.25 285)"
                        fill="oklch(0.65 0.25 285)"
                        fillOpacity={0.4}
                      />
                      <Radar
                        name="Top Avg"
                        dataKey="topAvg"
                        stroke="oklch(0.72 0.18 195)"
                        fill="oklch(0.72 0.18 195)"
                        fillOpacity={0.2}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Streak Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                Study Streak Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 flex-wrap">
                {streakData.map((day, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.02 }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                      day.value === 1
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {day.date}
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary/20 border border-primary/30" />
                  <span className="text-sm text-muted-foreground">Studied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-secondary" />
                  <span className="text-sm text-muted-foreground">Missed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  positive,
  delay,
}: {
  icon: typeof Clock
  label: string
  value: string
  change: string
  positive: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                positive ? "text-green-500" : "text-red-500"
              }`}
            >
              {positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {change}
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
