"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Trophy, Flame, Target, Clock, Zap, TrendingUp, Medal, Crown,
  ChevronRight, Award, ArrowUp, ArrowDown, BarChart3, Filter
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Competitor {
  id: string
  competitorRank: number
  name: string
  rank: string
  badges: number
  examScore: number
  studyStreak: number
  totalPoints: number
  avatar: string
  exam: string
  level: number
  bio: string
}

const MetricCard = ({ icon: Icon, label, value, unit, color }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    className={`p-4 rounded-lg bg-gradient-to-br ${color} border border-opacity-20 border-white`}
  >
    <div className="flex items-center gap-2 mb-2">
      <Icon className="h-4 w-4" />
      <span className="text-sm text-gray-200">{label}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-300">{unit}</p>
    </div>
  </motion.div>
)

const CompetitorCard = ({ competitor, index }: { competitor: Competitor; index: number }) => {
  const colors = [
    "from-yellow-500/20 to-yellow-600/10",
    "from-gray-400/20 to-gray-500/10",
    "from-orange-500/20 to-orange-600/10",
    "from-purple-500/20 to-purple-600/10",
  ]

  const medalIcons = [
    <Crown key="crown" className="h-5 w-5 text-yellow-400" />,
    <Medal key="silver" className="h-5 w-5 text-gray-300" />,
    <Medal key="bronze" className="h-5 w-5 text-orange-400" />,
    <Trophy key="trophy" className="h-5 w-5 text-purple-400" />,
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className={`bg-gradient-to-br ${colors[index]} border-opacity-40 overflow-hidden`}>
        <CardContent className="p-6">
          {/* Header with Rank */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-white border-opacity-30">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                    {competitor.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-white text-gray-900 rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm shadow-lg">
                  #{competitor.competitorRank}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {medalIcons[index]}
                  <h3 className="text-lg font-bold text-white">{competitor.name}</h3>
                </div>
                <Badge variant="secondary" className="mb-2">
                  {competitor.rank}
                </Badge>
                <p className="text-sm text-gray-200">{competitor.bio}</p>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 bg-white bg-opacity-10 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-4 w-4 text-yellow-300" />
                <span className="text-xs text-gray-200">Badges</span>
              </div>
              <p className="text-xl font-bold text-white">{competitor.badges}</p>
            </div>

            <div className="p-3 bg-white bg-opacity-10 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-purple-300" />
                <span className="text-xs text-gray-200">Level</span>
              </div>
              <p className="text-xl font-bold text-white">{competitor.level}</p>
            </div>

            <div className="p-3 bg-white bg-opacity-10 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-4 w-4 text-orange-300" />
                <span className="text-xs text-gray-200">Streak</span>
              </div>
              <p className="text-xl font-bold text-white">{competitor.studyStreak}d</p>
            </div>

            <div className="p-3 bg-white bg-opacity-10 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="h-4 w-4 text-blue-300" />
                <span className="text-xs text-gray-200">Exam</span>
              </div>
              <p className="text-xl font-bold text-white">{competitor.examScore}</p>
            </div>
          </div>

          {/* Total Points */}
          <div className="p-3 bg-gradient-to-r from-white/20 to-white/5 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-200">Total Points</span>
              <p className="text-2xl font-bold text-white">{competitor.totalPoints}</p>
            </div>
          </div>

          {/* View Profile Button */}
          <Link href={`/student/${competitor.id}`}>
            <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30" variant="outline">
              View Profile
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("totalPoints")

  useEffect(() => {
    fetchCompetitors(sortBy)
  }, [sortBy])

  const fetchCompetitors = async (sort: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/competitors?limit=4&sortBy=${sort}`)
      const data = await response.json()
      if (data.success) {
        setCompetitors(data.competitors)
      }
    } catch (error) {
      console.error("Failed to fetch competitors:", error)
    } finally {
      setLoading(false)
    }
  }

  const currentUserStats = {
    name: "You",
    badges: 16,
    examScore: 245,
    studyStreak: 22,
    totalPoints: 6200,
    level: 5
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Top Competitors</h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl">
            See how you stack up against the top performers. Compete, compare, and climb the leaderboard!
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-gray-300">Sort by:</span>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="totalPoints">Total Points</SelectItem>
              <SelectItem value="badges">Badges Earned</SelectItem>
              <SelectItem value="examScore">Exam Score</SelectItem>
              <SelectItem value="studyStreak">Study Streak</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Your Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-blue-400" />
                Your Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <MetricCard
                  icon={Trophy}
                  label="Badges"
                  value={currentUserStats.badges}
                  unit="earned"
                  color="from-yellow-500/40 to-yellow-600/20"
                />
                <MetricCard
                  icon={Zap}
                  label="Level"
                  value={currentUserStats.level}
                  unit="current"
                  color="from-purple-500/40 to-purple-600/20"
                />
                <MetricCard
                  icon={Flame}
                  label="Streak"
                  value={currentUserStats.studyStreak}
                  unit="days"
                  color="from-orange-500/40 to-orange-600/20"
                />
                <MetricCard
                  icon={BarChart3}
                  label="Exam"
                  value={currentUserStats.examScore}
                  unit="score"
                  color="from-blue-500/40 to-blue-600/20"
                />
                <MetricCard
                  icon={TrendingUp}
                  label="Points"
                  value={currentUserStats.totalPoints}
                  unit="total"
                  color="from-green-500/40 to-green-600/20"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Competitors Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Trophy className="h-12 w-12 text-yellow-400" />
            </motion.div>
          </div>
        ) : competitors.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {competitors.map((competitor, index) => (
              <CompetitorCard key={competitor.id} competitor={competitor} index={index} />
            ))}
          </motion.div>
        ) : (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <Trophy className="h-16 w-16 mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400 text-lg">No competitors found</p>
            </CardContent>
          </Card>
        )}

        {/* Comparison Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-400" />
                Healthy Competition Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Focus on your own progress — consistency beats comparison</span>
                </p>
                <p className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Learn from top performers by viewing their study strategies</span>
                </p>
                <p className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Maintain a healthy study streak and consistent effort</span>
                </p>
                <p className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Earn badges by completing challenges and study goals</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
