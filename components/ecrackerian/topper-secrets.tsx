"use client"

import { motion } from "framer-motion"
import { Trophy, Clock, BookOpen, Target, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TopperInsight {
  id: number
  exam: string
  name: string
  rank: string
  avatar: string
  schedule: {
    wakeUp: string
    studyHours: number
    subjects: string[]
    tip: string
  }
}

const TOPPER_INSIGHTS: TopperInsight[] = [
  {
    id: 1,
    exam: "JEE",
    name: "Mridul Agarwal",
    rank: "AIR 1",
    avatar: "MA",
    schedule: {
      wakeUp: "5:00 AM",
      studyHours: 12,
      subjects: ["Physics", "Math", "Chemistry"],
      tip: "Focus on understanding concepts, not just solving problems.",
    },
  },
  {
    id: 2,
    exam: "NEET",
    name: "Tanishka",
    rank: "AIR 1",
    avatar: "T",
    schedule: {
      wakeUp: "4:30 AM",
      studyHours: 10,
      subjects: ["Biology", "Chemistry", "Physics"],
      tip: "NCERT is your Bible. Read it 5 times minimum.",
    },
  },
  {
    id: 3,
    exam: "UPSC",
    name: "Shubham Kumar",
    rank: "AIR 1",
    avatar: "SK",
    schedule: {
      wakeUp: "5:30 AM",
      studyHours: 14,
      subjects: ["Current Affairs", "Ethics", "History"],
      tip: "Daily newspaper reading is non-negotiable.",
    },
  },
]

const EXAM_COLORS: Record<string, string> = {
  JEE: "bg-primary/20 text-primary border-primary/30",
  NEET: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  UPSC: "bg-accent/20 text-accent border-accent/30",
}

export function TopperSecrets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            {"Topper's Secrets"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {TOPPER_INSIGHTS.map((topper, index) => (
              <motion.div
                key={topper.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                      {topper.avatar}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-foreground">{topper.name}</h4>
                      <Badge className={EXAM_COLORS[topper.exam]}>
                        {topper.exam}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Trophy className="h-3 w-3 text-yellow-500" />
                        {topper.rank}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Wake: {topper.schedule.wakeUp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{topper.schedule.studyHours}h/day</span>
                      </div>
                    </div>

                    {/* Tip */}
                    <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground/80 italic">
                          {'"'}{topper.schedule.tip}{'"'}
                        </p>
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {topper.schedule.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
