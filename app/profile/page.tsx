"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Zap, User, Mail, Phone, MapPin, Calendar, GraduationCap, Target, Flame,
  Clock, Trophy, Medal, Award, Edit2, Camera, Settings, Bell, Shield,
  ChevronRight, BookOpen, TrendingUp, Star, ExternalLink, LogOut, X, Save,
  Share2, Copy, Check, Link2
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Generate unique student ID for shareable link
  const studentId = "stu_aryan_kumar_24"
  
  const [user, setUser] = useState({
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
  })

  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
    exam: user.exam,
    targetYear: user.targetYear,
  })

  const handleOpenEditModal = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      exam: user.exam,
      targetYear: user.targetYear,
    })
    setIsEditModalOpen(true)
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setUser(prev => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      location: editForm.location,
      exam: editForm.exam,
      targetYear: editForm.targetYear,
    }))
    setIsSaving(false)
    setIsEditModalOpen(false)
  }

  const getShareableLink = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/student/${studentId}`
    }
    return `/student/${studentId}`
  }

  const handleCopyLink = async () => {
    const link = getShareableLink()
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link")
    }
  }

  const handleShareNative = async () => {
    const link = getShareableLink()
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user.name}'s Ecrackerian Profile`,
          text: `Check out ${user.name}'s study progress on Ecrackerian!`,
          url: link,
        })
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleCopyLink()
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
                  <Button 
                    variant="default" 
                    onClick={() => setIsShareModalOpen(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Share2 className="h-4 w-4 mr-2" /> Share Profile
                  </Button>
                  <Button variant="outline" onClick={handleOpenEditModal}>
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

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl">Edit Profile</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Update your personal information and preferences
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="pl-10 bg-secondary border-border focus:border-primary"
                  placeholder="Your name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="pl-10 bg-secondary border-border focus:border-primary"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="pl-10 bg-secondary border-border focus:border-primary"
                  placeholder="+91 12345 67890"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-foreground">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="pl-10 bg-secondary border-border focus:border-primary"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Exam Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Target Exam</Label>
                <Select 
                  value={editForm.exam} 
                  onValueChange={(value) => setEditForm({ ...editForm, exam: value })}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select exam" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="JEE Mains">JEE Mains</SelectItem>
                    <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
                    <SelectItem value="NEET">NEET</SelectItem>
                    <SelectItem value="UPSC">UPSC</SelectItem>
                    <SelectItem value="CAT">CAT</SelectItem>
                    <SelectItem value="GATE">GATE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Target Year</Label>
                <Select 
                  value={editForm.targetYear} 
                  onValueChange={(value) => setEditForm({ ...editForm, targetYear: value })}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSaving ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mr-2"
                />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Profile Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              Share Your Profile
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Share your Ecrackerian profile with friends, teachers, or on social media
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Profile Preview Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-secondary to-accent/10 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.exam} - {user.targetYear}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-card/50">
                  <div className="text-lg font-bold text-primary">{user.streak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="p-2 rounded-lg bg-card/50">
                  <div className="text-lg font-bold text-accent">{user.totalHours}h</div>
                  <div className="text-xs text-muted-foreground">Study Hours</div>
                </div>
                <div className="p-2 rounded-lg bg-card/50">
                  <div className="text-lg font-bold text-foreground">Lv.{user.level}</div>
                  <div className="text-xs text-muted-foreground">Level</div>
                </div>
              </div>
            </div>

            {/* Shareable Link */}
            <div className="space-y-2">
              <Label className="text-foreground">Your shareable link</Label>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border">
                  <Link2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground truncate font-mono">
                    {typeof window !== "undefined" ? getShareableLink() : `/student/${studentId}`}
                  </span>
                </div>
                <Button 
                  onClick={handleCopyLink}
                  variant="outline"
                  className={`flex-shrink-0 ${copied ? "bg-green-500/20 border-green-500/50 text-green-500" : ""}`}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-2">
              <Label className="text-foreground">Share via</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-12 border-border hover:bg-secondary"
                  onClick={handleShareNative}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 border-border hover:bg-[#25D366]/10 hover:border-[#25D366]/50 hover:text-[#25D366]"
                  onClick={() => {
                    const link = getShareableLink()
                    window.open(`https://wa.me/?text=${encodeURIComponent(`Check out my study progress on Ecrackerian! ${link}`)}`, '_blank')
                  }}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* QR Code hint */}
            <div className="p-3 rounded-lg bg-secondary/50 border border-border">
              <p className="text-xs text-muted-foreground text-center">
                Anyone with this link can view your public profile including your study stats, achievements, and exam preparation progress.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button 
              variant="outline" 
              onClick={() => setIsShareModalOpen(false)}
              className="border-border"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
