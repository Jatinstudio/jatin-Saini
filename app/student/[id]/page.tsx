"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Zap, User, MapPin, Calendar, GraduationCap, Target, Flame,
  Clock, Trophy, Medal, Award, BookOpen, TrendingUp, Star, ExternalLink,
  Share2, Copy, Check, Link2
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { use } from "react"

const achievements = [
  { id: 1, name: "7-Day Streak", icon: Flame, earned: true, date: "Dec 2024" },
  { id: 2, name: "30-Day Streak", icon: Flame, earned: true, date: "Jan 2025" },
  { id: 3, name: "100 Hours", icon: Clock, earned: true, date: "Feb 2025" },
  { id: 4, name: "Top Contributor", icon: Trophy, earned: false, date: null },
  { id: 5, name: "Quiz Master", icon: Medal, earned: true, date: "Jan 2025" },
  { id: 6, name: "Community Helper", icon: Award, earned: false, date: null },
]

const recentActivity = [
  { type: "study", title: "Completed Physics Chapter 5", time: "2 hours ago", points: 50 },
  { type: "quiz", title: "Scored 92% in Chemistry Quiz", time: "Yesterday", points: 100 },
  { type: "streak", title: "14-day streak achieved!", time: "2 days ago", points: 200 },
]

export default function PublicStudentProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [copied, setCopied] = useState(false)

  // In production, fetch user data based on ID
  const user = {
    name: "Aryan Kumar",
    location: "Delhi, India",
    joinedDate: "January 2024",
    exam: "JEE Advanced",
    targetYear: "2025",
    rank: "Elite Cracker",
    points: 12580,
    level: 24,
    streak: 14,
    totalHours: 456,
    completedGoals: 89,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link")
    }
  }

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
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCopyLink}
              className={copied ? "bg-green-500/20 border-green-500/50 text-green-500" : ""}
            >
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90">
                Join Ecrackerian
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Public Profile Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
            <User className="h-3 w-3 mr-1" />
            Public Profile
          </Badge>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-primary/10 via-card to-accent/10 border-border/50 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/30 to-accent/30" />
            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-12">
                {/* Avatar */}
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Avatar className="h-24 w-24 border-4 border-card">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-3xl font-bold text-primary-foreground">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{user.name}</h1>
                    <Badge className="bg-primary/20 text-primary border-primary/30">{user.rank}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" /> {user.exam} - {user.targetYear}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {user.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Joined {user.joinedDate}
                    </span>
                  </div>
                  
                  {/* Level Progress */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-xs">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-foreground font-medium">Level {user.level}</span>
                        <span className="text-muted-foreground">{user.points.toLocaleString()} XP</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Flame} label="Current Streak" value={`${user.streak} days`} color="text-orange-500" delay={0.1} />
          <StatCard icon={Clock} label="Study Hours" value={`${user.totalHours}h`} color="text-cyan-500" delay={0.15} />
          <StatCard icon={Target} label="Goals Done" value={`${user.completedGoals}%`} color="text-green-500" delay={0.2} />
          <StatCard icon={Trophy} label="Total Points" value={user.points.toLocaleString()} color="text-yellow-500" delay={0.25} />
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.filter(a => a.earned).map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="p-4 rounded-xl border text-center bg-primary/10 border-primary/30"
                    >
                      <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-primary/20">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="font-medium text-foreground mb-1">{achievement.name}</div>
                      <div className="text-xs text-muted-foreground">{achievement.date}</div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-8"
        >
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.type === "study" ? "bg-blue-500/20 text-blue-500" :
                      activity.type === "quiz" ? "bg-green-500/20 text-green-500" :
                      "bg-orange-500/20 text-orange-500"
                    }`}>
                      {activity.type === "study" && <BookOpen className="h-5 w-5" />}
                      {activity.type === "quiz" && <Target className="h-5 w-5" />}
                      {activity.type === "streak" && <Flame className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    +{activity.points} XP
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Want to track your study progress like {user.name.split(' ')[0]}?
              </h3>
              <p className="text-muted-foreground mb-4">
                Join Ecrackerian and compete with toppers, track your progress, and crack your exams!
              </p>
              <div className="flex justify-center gap-3">
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary/90">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          <Link href="/" className="hover:text-foreground">
            Ecrackerian
          </Link>
          {" - "}Productivity meets Streetwear for Gen-Z exam crackers
        </div>
      </footer>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color, delay }: {
  icon: typeof Flame
  label: string
  value: string
  color: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4 text-center">
          <Icon className={`h-8 w-8 mx-auto mb-2 ${color}`} />
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
