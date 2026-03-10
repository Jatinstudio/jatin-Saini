"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Zap, Users, MessageSquare, Heart, Share2, Bookmark, MoreHorizontal,
  Send, Image, Smile, Hash, TrendingUp, Award, Clock, Filter, Search,
  ChevronRight, ThumbsUp, MessageCircle, Eye
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const studyGroups = [
  { id: 1, name: "JEE Warriors", members: 2340, online: 156, color: "from-orange-500 to-red-500", tag: "jee" },
  { id: 2, name: "NEET Aspirants", members: 1890, online: 98, color: "from-green-500 to-emerald-500", tag: "neet" },
  { id: 3, name: "UPSC Champions", members: 1245, online: 67, color: "from-blue-500 to-indigo-500", tag: "upsc" },
  { id: 4, name: "Doubt Clearing", members: 3450, online: 234, color: "from-purple-500 to-pink-500", tag: "doubts" },
  { id: 5, name: "Study Partners", members: 890, online: 45, color: "from-cyan-500 to-teal-500", tag: "partners" },
]

const discussions = [
  {
    id: 1,
    author: { name: "Arjun Sharma", avatar: "", rank: "Elite Cracker", verified: true },
    title: "How I improved my Physics score from 60 to 95 in 3 months",
    content: "After struggling with Physics for months, I finally cracked the code. Here's my complete strategy that helped me improve significantly...",
    tags: ["JEE", "Physics", "Strategy"],
    likes: 234,
    comments: 56,
    views: 1.2,
    time: "2h ago",
    pinned: true,
  },
  {
    id: 2,
    author: { name: "Priya Patel", avatar: "", rank: "Rising Star", verified: false },
    title: "Best YouTube channels for Organic Chemistry?",
    content: "Looking for recommendations on YouTube channels that explain organic chemistry concepts well. Currently preparing for NEET.",
    tags: ["NEET", "Chemistry", "Resources"],
    likes: 89,
    comments: 34,
    views: 0.5,
    time: "4h ago",
    pinned: false,
  },
  {
    id: 3,
    author: { name: "Rahul Verma", avatar: "", rank: "Topper", verified: true },
    title: "My complete UPSC Prelims preparation timeline",
    content: "Sharing my 6-month preparation timeline that helped me clear UPSC Prelims in my first attempt. Feel free to adapt it...",
    tags: ["UPSC", "Timeline", "Success"],
    likes: 567,
    comments: 123,
    views: 3.4,
    time: "6h ago",
    pinned: false,
  },
  {
    id: 4,
    author: { name: "Sneha Gupta", avatar: "", rank: "Contributor", verified: false },
    title: "Need study partner for JEE Mains revision",
    content: "Looking for a study buddy to revise JEE Mains syllabus together. Planning to cover one subject per week.",
    tags: ["JEE", "Study Partner", "Revision"],
    likes: 45,
    comments: 28,
    views: 0.3,
    time: "8h ago",
    pinned: false,
  },
]

const topContributors = [
  { name: "Arjun S.", points: 12500, rank: 1, avatar: "" },
  { name: "Priya P.", points: 11200, rank: 2, avatar: "" },
  { name: "Rahul V.", points: 10800, rank: 3, avatar: "" },
  { name: "Sneha G.", points: 9500, rank: 4, avatar: "" },
  { name: "Amit K.", points: 8900, rank: 5, avatar: "" },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [newPost, setNewPost] = useState("")

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
            <Link href="/community" className="text-primary font-medium">Community</Link>
            <Link href="/resources" className="text-muted-foreground hover:text-foreground">Resources</Link>
          </nav>
          <Link href="/profile">
            <Button variant="outline" size="sm">Profile</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Study Groups */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  Study Groups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studyGroups.map((group) => (
                  <motion.button
                    key={group.id}
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/30 transition-all text-left"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center`}>
                      <Hash className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{group.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {group.members.toLocaleString()} members
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-muted-foreground">{group.online}</span>
                    </div>
                  </motion.button>
                ))}
                <Button variant="ghost" className="w-full text-primary">
                  Browse All Groups <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            {/* Create Post */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm mb-6">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/20 text-primary">YO</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Share your doubts, tips, or start a discussion..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="bg-secondary border-border mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Image className="h-4 w-4 mr-1" /> Image
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Smile className="h-4 w-4 mr-1" /> GIF
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Hash className="h-4 w-4 mr-1" /> Tag
                        </Button>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Send className="h-4 w-4 mr-1" /> Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="discussions" className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" /> Filter
                </Button>
              </div>

              <TabsContent value="discussions" className="space-y-4">
                {discussions.map((post, index) => (
                  <DiscussionCard key={post.id} post={post} index={index} />
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                {discussions.filter(p => p.likes > 100).map((post, index) => (
                  <DiscussionCard key={post.id} post={post} index={index} />
                ))}
              </TabsContent>

              <TabsContent value="questions" className="space-y-4">
                {discussions.filter(p => p.title.includes("?")).map((post, index) => (
                  <DiscussionCard key={post.id} post={post} index={index} />
                ))}
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Search */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["#JEEMains2024", "#NEETPreparation", "#StudyTips", "#PhysicsHacks", "#MathProblems"].map((topic, i) => (
                  <motion.div
                    key={topic}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 cursor-pointer"
                  >
                    <span className="text-primary font-medium">{topic}</span>
                    <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 500) + 100} posts</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Award className="h-5 w-5 text-primary" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topContributors.map((user) => (
                  <motion.div
                    key={user.rank}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.rank === 1
                          ? "bg-yellow-500/20 text-yellow-500"
                          : user.rank === 2
                          ? "bg-gray-400/20 text-gray-400"
                          : user.rank === 3
                          ? "bg-orange-500/20 text-orange-500"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.points.toLocaleString()} pts</div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

function DiscussionCard({ post, index }: { post: typeof discussions[0]; index: number }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
        <CardContent className="p-5">
          {post.pinned && (
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">
              Pinned
            </Badge>
          )}

          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/20 text-primary">
                  {post.author.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{post.author.name}</span>
                  {post.author.verified && (
                    <Badge variant="secondary" className="text-xs bg-accent/20 text-accent">
                      {post.author.rank}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {post.time}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary cursor-pointer">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{post.content}</p>

          <div className="flex items-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-secondary text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1 text-sm ${
                  liked ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${liked ? "fill-primary" : ""}`} />
                {post.likes + (liked ? 1 : 0)}
              </motion.button>
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </button>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                {post.views}k
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setSaved(!saved)}
                className={`p-2 rounded-lg ${
                  saved ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${saved ? "fill-primary" : ""}`} />
              </motion.button>
              <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
