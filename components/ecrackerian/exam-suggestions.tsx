"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, MessageSquare, Lightbulb, UserPlus, ChevronRight, 
  Flame, Target, BookOpen, Star, ThumbsUp, Clock, Sparkles
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Exam-specific data
const examData = {
  "JEE": {
    color: "from-orange-500 to-red-500",
    accentColor: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    profiles: [
      { id: 1, name: "Arjun Mehra", rank: "AIR 156", streak: 45, hours: 8.5, avatar: "AM", verified: true },
      { id: 2, name: "Shreya Iyer", rank: "99.2%ile", streak: 32, hours: 7.2, avatar: "SI", verified: true },
      { id: 3, name: "Karthik R.", rank: "AIR 423", streak: 28, hours: 6.8, avatar: "KR", verified: false },
      { id: 4, name: "Ananya Das", rank: "98.5%ile", streak: 21, hours: 6.5, avatar: "AD", verified: true },
    ],
    comments: [
      { id: 1, author: "Arjun Mehra", text: "For JEE Physics, focus on Mechanics first. It forms 30% of the paper!", likes: 234, time: "2h ago" },
      { id: 2, author: "Shreya Iyer", text: "HC Verma + PYQs is the winning combo for Physics. Don't skip solved examples!", likes: 189, time: "4h ago" },
      { id: 3, author: "Karthik R.", text: "Organic Chemistry tip: Make reaction flowcharts. Visual memory works best.", likes: 156, time: "6h ago" },
      { id: 4, author: "JEE Topper 2024", text: "Mathematics revision: Practice 50 problems daily from Cengage/Arihant.", likes: 312, time: "8h ago" },
    ],
    tips: [
      "Focus on NCERT for Chemistry inorganic",
      "Solve previous 10 years JEE Advanced papers",
      "Master Calculus - it appears in Physics too",
      "Practice time management with mock tests",
    ]
  },
  "NEET": {
    color: "from-green-500 to-emerald-500",
    accentColor: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    profiles: [
      { id: 1, name: "Priya Sharma", rank: "AIR 89", streak: 52, hours: 9.2, avatar: "PS", verified: true },
      { id: 2, name: "Rohit Kumar", rank: "690/720", streak: 38, hours: 8.1, avatar: "RK", verified: true },
      { id: 3, name: "Kavya Nair", rank: "AIR 234", streak: 41, hours: 7.8, avatar: "KN", verified: false },
      { id: 4, name: "Aditya Singh", rank: "685/720", streak: 29, hours: 7.5, avatar: "AS", verified: true },
    ],
    comments: [
      { id: 1, author: "Priya Sharma", text: "Biology is your scoring subject! NCERT line by line is non-negotiable.", likes: 456, time: "1h ago" },
      { id: 2, author: "Rohit Kumar", text: "For NEET Physics, focus on Class 11 topics - they have higher weightage.", likes: 289, time: "3h ago" },
      { id: 3, author: "Kavya Nair", text: "Botany tip: Make diagrams for plant anatomy. Visual learning helps retention.", likes: 198, time: "5h ago" },
      { id: 4, author: "NEET Topper 2024", text: "Chemistry: Inorganic from NCERT, Organic reactions daily, Physical numericals.", likes: 534, time: "7h ago" },
    ],
    tips: [
      "NCERT Biology - read every line, diagram, and footnote",
      "Focus on Human Physiology and Genetics",
      "Practice assertion-reasoning questions",
      "Revise NCERT Chemistry exemplar problems",
    ]
  },
  "UPSC": {
    color: "from-blue-500 to-indigo-500",
    accentColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    profiles: [
      { id: 1, name: "Vikram Reddy", rank: "AIR 12", streak: 120, hours: 10.5, avatar: "VR", verified: true },
      { id: 2, name: "Meera Joshi", rank: "AIR 45", streak: 98, hours: 9.8, avatar: "MJ", verified: true },
      { id: 3, name: "Sanjay Gupta", rank: "AIR 78", streak: 85, hours: 9.2, avatar: "SG", verified: false },
      { id: 4, name: "Neha Rao", rank: "AIR 134", streak: 72, hours: 8.5, avatar: "NR", verified: true },
    ],
    comments: [
      { id: 1, author: "Vikram Reddy", text: "Current affairs is key! Read The Hindu daily and make notes.", likes: 678, time: "2h ago" },
      { id: 2, author: "Meera Joshi", text: "For Prelims, NCERTs 6-12 are your Bible. No shortcuts here.", likes: 543, time: "4h ago" },
      { id: 3, author: "Sanjay Gupta", text: "Answer writing practice is crucial for Mains. Start early, write daily.", likes: 432, time: "6h ago" },
      { id: 4, author: "IAS Topper 2024", text: "Optional subject: Choose based on interest + overlap with GS syllabus.", likes: 789, time: "1d ago" },
    ],
    tips: [
      "Daily newspaper reading is mandatory",
      "Make notes using mind maps for revision",
      "Focus on interlinking topics across subjects",
      "Practice answer writing from Day 1",
    ]
  },
  "CAT": {
    color: "from-purple-500 to-pink-500",
    accentColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    profiles: [
      { id: 1, name: "Rahul Verma", rank: "99.8%ile", streak: 35, hours: 4.5, avatar: "RV", verified: true },
      { id: 2, name: "Aisha Khan", rank: "99.5%ile", streak: 28, hours: 4.2, avatar: "AK", verified: true },
      { id: 3, name: "Nikhil Jain", rank: "99.2%ile", streak: 22, hours: 3.8, avatar: "NJ", verified: false },
      { id: 4, name: "Pooja Mehta", rank: "98.9%ile", streak: 18, hours: 3.5, avatar: "PM", verified: true },
    ],
    comments: [
      { id: 1, author: "Rahul Verma", text: "VARC is the differentiator! Read newspapers, novels - build reading speed.", likes: 234, time: "3h ago" },
      { id: 2, author: "Aisha Khan", text: "QA tip: Master number system and arithmetic - they're your quick wins.", likes: 189, time: "5h ago" },
      { id: 3, author: "Nikhil Jain", text: "DILR needs practice. Solve 2-3 sets daily, focus on accuracy first.", likes: 156, time: "7h ago" },
      { id: 4, author: "CAT Topper 2024", text: "Mock strategy: Attempt easy questions first, time is your biggest enemy.", likes: 312, time: "1d ago" },
    ],
    tips: [
      "Build reading habit - minimum 1 hour daily",
      "Practice mental calculations",
      "Take at least 30 full-length mocks",
      "Analyze every mock test thoroughly",
    ]
  },
  "GATE": {
    color: "from-cyan-500 to-teal-500",
    accentColor: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    profiles: [
      { id: 1, name: "Arun Krishnan", rank: "AIR 34", streak: 42, hours: 6.5, avatar: "AK", verified: true },
      { id: 2, name: "Sneha Pillai", rank: "AIR 89", streak: 35, hours: 6.2, avatar: "SP", verified: true },
      { id: 3, name: "Raj Malhotra", rank: "AIR 156", streak: 28, hours: 5.8, avatar: "RM", verified: false },
      { id: 4, name: "Divya Sharma", rank: "AIR 234", streak: 21, hours: 5.5, avatar: "DS", verified: true },
    ],
    comments: [
      { id: 1, author: "Arun Krishnan", text: "Core subjects carry 70% weightage. Master them first!", likes: 234, time: "2h ago" },
      { id: 2, author: "Sneha Pillai", text: "Previous year questions are gold! Solve last 15 years minimum.", likes: 189, time: "4h ago" },
      { id: 3, author: "Raj Malhotra", text: "Aptitude + Engineering Maths = Easy 15 marks. Don't neglect them.", likes: 156, time: "6h ago" },
      { id: 4, author: "GATE Topper 2024", text: "Subject-wise revision: Maintain formula sheets, revise weekly.", likes: 312, time: "8h ago" },
    ],
    tips: [
      "Focus on core subjects of your branch",
      "Solve previous year GATE papers thoroughly",
      "Don't neglect Engineering Mathematics",
      "Practice virtual calculator before exam",
    ]
  }
}

type ExamType = keyof typeof examData

interface ExamSuggestionsProps {
  currentExam: string
  userName?: string
}

export function ExamSuggestions({ currentExam, userName = "Aspirant" }: ExamSuggestionsProps) {
  const [followedUsers, setFollowedUsers] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("profiles")
  
  // Normalize exam name to match our data keys
  const normalizedExam = currentExam.toUpperCase().replace(/\s+/g, '').replace('MAINS', '').replace('ADVANCED', '') as ExamType
  const examKey = Object.keys(examData).find(key => 
    normalizedExam.includes(key) || key.includes(normalizedExam.split(' ')[0])
  ) as ExamType || "JEE"
  
  const data = examData[examKey]

  const handleFollow = (userId: number) => {
    setFollowedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden">
      {/* Header with exam badge */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${data.color}`}>
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="block">For You</span>
              <span className="text-xs font-normal text-muted-foreground">Personalized for {examKey} preparation</span>
            </div>
          </CardTitle>
          <Badge className={`${data.bgColor} ${data.accentColor} ${data.borderColor}`}>
            {examKey}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="profiles" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4">
            <TabsTrigger 
              value="profiles" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Users className="h-4 w-4 mr-2" />
              Top Crackers
            </TabsTrigger>
            <TabsTrigger 
              value="comments"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Hot Tips
            </TabsTrigger>
            <TabsTrigger 
              value="tips"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Quick Tips
            </TabsTrigger>
          </TabsList>

          {/* Suggested Profiles */}
          <TabsContent value="profiles" className="p-4 space-y-3 mt-0">
            <AnimatePresence mode="popLayout">
              {data.profiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-xl ${data.bgColor} border ${data.borderColor} hover:border-primary/50 transition-all`}
                >
                  <Avatar className="h-12 w-12 border-2 border-background">
                    <AvatarFallback className={`bg-gradient-to-br ${data.color} text-white font-semibold`}>
                      {profile.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground truncate">{profile.name}</span>
                      {profile.verified && (
                        <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className={`font-medium ${data.accentColor}`}>{profile.rank}</span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-500" />
                        {profile.streak} days
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {profile.hours}h/day
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFollow(profile.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      followedUsers.includes(profile.id)
                        ? "bg-primary text-primary-foreground"
                        : `${data.bgColor} ${data.accentColor} border ${data.borderColor} hover:bg-primary/20`
                    }`}
                  >
                    {followedUsers.includes(profile.id) ? (
                      "Following"
                    ) : (
                      <span className="flex items-center gap-1">
                        <UserPlus className="h-3 w-3" /> Follow
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link href="/community">
              <Button variant="ghost" className="w-full text-primary hover:bg-primary/10">
                View All {examKey} Crackers <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </TabsContent>

          {/* Exam-specific Comments/Tips */}
          <TabsContent value="comments" className="p-4 space-y-3 mt-0">
            <AnimatePresence mode="popLayout">
              {data.comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={`bg-gradient-to-br ${data.color} text-white text-xs`}>
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium text-foreground text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground ml-2">{comment.time}</span>
                      </div>
                    </div>
                    <Badge className={`${data.bgColor} ${data.accentColor} text-xs`}>
                      {examKey}
                    </Badge>
                  </div>
                  
                  <p className="text-foreground text-sm leading-relaxed mb-3">{comment.text}</p>
                  
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {comment.likes}
                    </motion.button>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Reply
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link href="/community">
              <Button variant="ghost" className="w-full text-primary hover:bg-primary/10">
                See More {examKey} Discussions <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </TabsContent>

          {/* Quick Tips */}
          <TabsContent value="tips" className="p-4 mt-0">
            <div className="space-y-3">
              {data.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-3 p-3 rounded-xl ${data.bgColor} border ${data.borderColor}`}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${data.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-foreground text-sm">{tip}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-card to-accent/10 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Daily Goal</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete {examKey === "UPSC" ? "8" : examKey === "CAT" ? "4" : "6"} hours of focused study to stay on track with top rankers.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
