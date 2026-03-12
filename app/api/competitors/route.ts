import { NextRequest, NextResponse } from "next/server"

// Mock competitor data - In production, fetch from database
const mockCompetitors = [
  {
    id: "user_1",
    name: "Arjun Sharma",
    rank: "Elite Cracker",
    badges: 24,
    examScore: 285,
    studyStreak: 45,
    totalPoints: 8500,
    avatar: "AS",
    exam: "JEE Advanced",
    level: 8,
    bio: "JEE Aspirant | Cracking competitive exams one problem at a time"
  },
  {
    id: "user_2",
    name: "Priya Patel",
    rank: "Rising Star",
    badges: 18,
    examScore: 268,
    studyStreak: 32,
    totalPoints: 7200,
    avatar: "PP",
    exam: "JEE Advanced",
    level: 7,
    bio: "Physics & Maths enthusiast | Always learning"
  },
  {
    id: "user_3",
    name: "Vikram Singh",
    rank: "Consistent Learner",
    badges: 21,
    examScore: 275,
    studyStreak: 38,
    totalPoints: 7800,
    avatar: "VS",
    exam: "JEE Advanced",
    level: 7,
    bio: "Dedicated to excellence in studies"
  },
  {
    id: "user_4",
    name: "Ananya Dubey",
    rank: "Quiz Master",
    badges: 19,
    examScore: 265,
    studyStreak: 28,
    totalPoints: 6950,
    avatar: "AD",
    exam: "JEE Advanced",
    level: 6,
    bio: "Problem solver | Love chemistry"
  }
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get("limit") || "4", 10)
    const sortBy = searchParams.get("sortBy") || "totalPoints"

    // Sort competitors based on requested metric
    const sortedCompetitors = [...mockCompetitors].sort((a, b) => {
      switch (sortBy) {
        case "badges":
          return b.badges - a.badges
        case "examScore":
          return b.examScore - a.examScore
        case "studyStreak":
          return b.studyStreak - a.studyStreak
        case "totalPoints":
        default:
          return b.totalPoints - a.totalPoints
      }
    })

    const topCompetitors = sortedCompetitors.slice(0, limit)

    // Add rank information
    const rankedCompetitors = topCompetitors.map((competitor, index) => ({
      ...competitor,
      competitorRank: index + 1
    }))

    return NextResponse.json({
      success: true,
      competitors: rankedCompetitors,
      count: rankedCompetitors.length
    })
  } catch (error) {
    console.error("Error fetching competitors:", error)
    return NextResponse.json(
      { error: "Failed to fetch competitors" },
      { status: 500 }
    )
  }
}
