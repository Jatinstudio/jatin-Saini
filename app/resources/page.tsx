"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Zap, Search, Filter, BookOpen, Video, FileText, Download, Star, Clock,
  ChevronRight, Grid, List, Play, ExternalLink, Bookmark, Eye, Users,
  Atom, Calculator, FlaskConical, Globe, BookMarked, GraduationCap
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  { id: "all", label: "All", icon: Grid },
  { id: "physics", label: "Physics", icon: Atom, color: "from-orange-500 to-red-500" },
  { id: "chemistry", label: "Chemistry", icon: FlaskConical, color: "from-green-500 to-emerald-500" },
  { id: "maths", label: "Mathematics", icon: Calculator, color: "from-blue-500 to-indigo-500" },
  { id: "biology", label: "Biology", icon: Globe, color: "from-purple-500 to-pink-500" },
  { id: "general", label: "General Studies", icon: BookMarked, color: "from-cyan-500 to-teal-500" },
]

const resources = [
  {
    id: 1,
    title: "Complete Physics Formulae Sheet",
    type: "pdf",
    subject: "physics",
    exam: "JEE",
    rating: 4.8,
    downloads: 12500,
    views: 45000,
    author: "Prof. HC Verma",
    duration: null,
    size: "2.4 MB",
    premium: false,
    thumbnail: null,
    description: "Comprehensive formula sheet covering all JEE Physics topics with quick revision notes.",
  },
  {
    id: 2,
    title: "Organic Chemistry - Full Course",
    type: "video",
    subject: "chemistry",
    exam: "NEET",
    rating: 4.9,
    downloads: null,
    views: 89000,
    author: "Dr. Pankaj Sir",
    duration: "24h 30m",
    size: null,
    premium: true,
    thumbnail: null,
    description: "Complete organic chemistry course for NEET with reaction mechanisms and shortcuts.",
  },
  {
    id: 3,
    title: "Calculus Problem Set - 500+ Questions",
    type: "pdf",
    subject: "maths",
    exam: "JEE",
    rating: 4.7,
    downloads: 8900,
    views: 32000,
    author: "IIT Crackers Team",
    duration: null,
    size: "5.6 MB",
    premium: false,
    thumbnail: null,
    description: "Curated set of 500+ calculus problems from JEE Advanced previous years.",
  },
  {
    id: 4,
    title: "NCERT Biology - Chapter Notes",
    type: "notes",
    subject: "biology",
    exam: "NEET",
    rating: 4.6,
    downloads: 15600,
    views: 67000,
    author: "NEET Toppers",
    duration: null,
    size: "8.2 MB",
    premium: false,
    thumbnail: null,
    description: "Detailed chapter-wise notes for NCERT Biology with diagrams and mnemonics.",
  },
  {
    id: 5,
    title: "Modern Indian History - Complete Video Series",
    type: "video",
    subject: "general",
    exam: "UPSC",
    rating: 4.9,
    downloads: null,
    views: 156000,
    author: "UPSC Pathshala",
    duration: "48h 15m",
    size: null,
    premium: true,
    thumbnail: null,
    description: "In-depth coverage of Modern Indian History for UPSC CSE Prelims and Mains.",
  },
  {
    id: 6,
    title: "JEE Chemistry - Quick Revision Notes",
    type: "notes",
    subject: "chemistry",
    exam: "JEE",
    rating: 4.5,
    downloads: 9800,
    views: 28000,
    author: "Ecrackerian Team",
    duration: null,
    size: "3.1 MB",
    premium: false,
    thumbnail: null,
    description: "Last minute revision notes covering all important concepts for JEE Chemistry.",
  },
]

const featuredPlaylists = [
  {
    id: 1,
    title: "JEE Mains 2024 Complete Crash Course",
    videos: 156,
    duration: "120h",
    students: 23400,
    rating: 4.8,
  },
  {
    id: 2,
    title: "NEET Biology - All Chapters",
    videos: 89,
    duration: "78h",
    students: 18900,
    rating: 4.9,
  },
  {
    id: 3,
    title: "UPSC Prelims Foundation",
    videos: 210,
    duration: "180h",
    students: 12500,
    rating: 4.7,
  },
]

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === "all" || resource.subject === activeCategory
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
            <Link href="/resources" className="text-primary font-medium">Resources</Link>
          </nav>
          <Link href="/profile">
            <Button variant="outline" size="sm">Profile</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Resource Library</h1>
          <p className="text-muted-foreground">Curated study materials, video lectures, and notes from toppers</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search resources, topics, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-border text-lg"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-12">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:border-primary/50"
                }`}
              >
                <Icon className="h-5 w-5" />
                {category.label}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Featured Playlists */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Featured Playlists</h2>
            <Button variant="ghost" className="text-primary">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredPlaylists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-border/50 hover:border-primary/50 transition-all cursor-pointer overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center relative">
                    <div className="w-16 h-16 rounded-full bg-card/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-primary fill-primary" />
                    </div>
                    <Badge className="absolute top-3 right-3 bg-primary/90">{playlist.videos} videos</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{playlist.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {playlist.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" /> {(playlist.students / 1000).toFixed(1)}k
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {playlist.rating}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resource Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">All Resources</h2>
            <span className="text-muted-foreground">{filteredResources.length} resources</span>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredResources.map((resource, index) => (
                <ResourceListItem key={resource.id} resource={resource} index={index} />
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

function ResourceCard({ resource, index }: { resource: typeof resources[0]; index: number }) {
  const typeIcons = {
    pdf: FileText,
    video: Video,
    notes: BookOpen,
  }
  const Icon = typeIcons[resource.type as keyof typeof typeIcons]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              resource.type === "video" ? "bg-red-500/20 text-red-500" :
              resource.type === "pdf" ? "bg-blue-500/20 text-blue-500" :
              "bg-green-500/20 text-green-500"
            }`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-2">
              {resource.premium && (
                <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Premium</Badge>
              )}
              <Badge variant="secondary">{resource.exam}</Badge>
            </div>
          </div>

          <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{resource.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{resource.description}</p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <GraduationCap className="h-4 w-4" />
            <span>{resource.author}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {resource.rating}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> {(resource.views / 1000).toFixed(1)}k
              </span>
            </div>
            <Button size="sm" variant="ghost" className="text-primary">
              {resource.type === "video" ? (
                <>
                  <Play className="h-4 w-4 mr-1" /> Watch
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-1" /> Get
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ResourceListItem({ resource, index }: { resource: typeof resources[0]; index: number }) {
  const typeIcons = {
    pdf: FileText,
    video: Video,
    notes: BookOpen,
  }
  const Icon = typeIcons[resource.type as keyof typeof typeIcons]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.05 }}
    >
      <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer">
        <CardContent className="p-4 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            resource.type === "video" ? "bg-red-500/20 text-red-500" :
            resource.type === "pdf" ? "bg-blue-500/20 text-blue-500" :
            "bg-green-500/20 text-green-500"
          }`}>
            <Icon className="h-6 w-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{resource.title}</h3>
              {resource.premium && (
                <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-xs">Premium</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{resource.description}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>{resource.author}</span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> {resource.rating}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {(resource.views / 1000).toFixed(1)}k
              </span>
              {resource.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {resource.duration}
                </span>
              )}
              {resource.size && (
                <span>{resource.size}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{resource.exam}</Badge>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              {resource.type === "video" ? "Watch" : "Download"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
