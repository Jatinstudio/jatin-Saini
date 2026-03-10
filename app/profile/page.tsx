"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Zap, User, Mail, Phone, MapPin, Calendar, GraduationCap, Target, Flame,
  Clock, Trophy, Medal, Award, Edit2, Camera, Settings, Bell, Shield,
  ChevronRight, BookOpen, TrendingUp, Star, ExternalLink, LogOut
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

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
  { type: "community", title: "Answered 3 questions", time: "Yesterday", points: 30 },
  { type: "streak", title: "14-day streak achieved!", time: "2 days ago", points: 200 },
  { type: "resource", title: "Downloaded Maths notes", time: "3 days ago", points: 10 },
]

const savedResources = [
  { id: 1, title: "JEE Physics Formula Sheet", type: "PDF", exam: "JEE" },
  { id: 2, title: "Organic Chemistry Crash Course", type: "Video", exam: "NEET" },
  { id: 3, title: "Calculus Practice Problems", type: "Notes", exam: "JEE" },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const user = {
    name: "Aryan Kumar",
    email: "aryan@example.com",
    phone: "+91 98765 43210",
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
            <Link href="/analytics" className="text-muted-foreground hover:text-foreground">Analytics</Link>
            <Link href="/community" className="text-muted-foreground hover:text-foreground">Community</Link>
            <Link href="/resources" className="text-muted-foreground hover:text-foreground">Resources</Link>
          </nav>
          <Link href="/profile">
            <Button variant="default" size="sm">Profile</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-primary/10 via-card to-accent/10 border-border/50 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary/30 to-accent/30" />
            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                {/* Avatar */}
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <Avatar className="h-32 w-32 border-4 border-card">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-4xl font-bold text-primary-foreground">
                      AK
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                    <Camera className="h-4 w-4" />
                  </button>
                </motion.div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
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
                      <p className="text-xs text-muted-foreground mt-1">1,420 XP to Level {user.level + 1}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Flame} label="Current Streak" value={`${user.streak} days`} color="text-orange-500" delay={0.1} />
          <StatCard icon={Clock} label="Total Study Hours" value={`${user.totalHours}h`} color="text-cyan-500" delay={0.15} />
          <StatCard icon={Target} label="Goals Completed" value={`${user.completedGoals}%`} color="text-green-500" delay={0.2} />
          <StatCard icon={Trophy} label="Total Points" value={user.points.toLocaleString()} color="text-yellow-500" delay={0.25} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <Tabs defaultValue="activity">
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="saved">Saved Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="mt-4">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            activity.type === "study" ? "bg-blue-500/20 text-blue-500" :
                            activity.type === "quiz" ? "bg-green-500/20 text-green-500" :
                            activity.type === "community" ? "bg-purple-500/20 text-purple-500" :
                            activity.type === "streak" ? "bg-orange-500/20 text-orange-500" :
                            "bg-cyan-500/20 text-cyan-500"
                          }`}>
                            {activity.type === "study" && <BookOpen className="h-5 w-5" />}
                            {activity.type === "quiz" && <Target className="h-5 w-5" />}
                            {activity.type === "community" && <User className="h-5 w-5" />}
                            {activity.type === "streak" && <Flame className="h-5 w-5" />}
                            {activity.type === "resource" && <BookOpen className="h-5 w-5" />}
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
              </TabsContent>

              <TabsContent value="achievements" className="mt-4">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {achievements.map((achievement, index) => {
                        const Icon = achievement.icon
                        return (
                          <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className={`p-4 rounded-xl border text-center transition-all ${
                              achievement.earned
                                ? "bg-primary/10 border-primary/30"
                                : "bg-secondary/50 border-border opacity-50"
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                              achievement.earned ? "bg-primary/20" : "bg-secondary"
                            }`}>
                              <Icon className={`h-6 w-6 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`} />
                            </div>
                            <div className={`font-medium mb-1 ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}>
                              {achievement.name}
                            </div>
                            {achievement.earned ? (
                              <div className="text-xs text-muted-foreground">{achievement.date}</div>
                            ) : (
                              <div className="text-xs text-muted-foreground">Locked</div>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved" className="mt-4">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Saved Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {savedResources.map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{resource.title}</div>
                            <div className="text-sm text-muted-foreground">{resource.type} - {resource.exam}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                    <Button variant="ghost" className="w-full text-primary">
                      View All Saved Resources <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Right Column - Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="space-y-6"
          >
            {/* Contact Info */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">{user.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Settings */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Push Notifications</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Email Updates</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Profile Visibility</span>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <Link href="/login">
                  <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10">
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
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
