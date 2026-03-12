# 🎖️ Ecrackerian Badge System - Complete Guide

## Overview
Ecrackerian platform का customizable badge system जो students को motivate करता है और उनकी progress को celebrate करता है।

---

## 📚 Badge Streams (5 विभिन्न exam streams के लिए)

### 1. **JEE / NEET (The Scientists)** ⚛️
Scientists के लिए focus और accuracy सबसे महत्वपूर्ण है।

| Level | Badge | Icon | Criteria |
|-------|-------|------|----------|
| 1 | Atom Starter | ⚛️ | 50 घंटे अभ्यास |
| 2 | Formula Wizard | 🧮 | 85% accuracy |
| 3 | Reaction Master | ⚡ | 30 दिन की streak |
| 4 | Quantum Leaper | 🚀 | 200+ घंटे |
| 5 | IITian / Medic Mindset | 👑 | Elite (500h + 95% + 60 दिन) |

### 2. **UPSC (The Administrators)** 🏛️
शासन तंत्र के aspirants के लिए serious और authority वाले badges.

| Level | Badge | Icon | Criteria |
|-------|-------|------|----------|
| 1 | Aspirant Soul | 🎯 | 7 दिन की streak |
| 2 | Fact Finder | 📰 | 75+ quiz score |
| 3 | Policy Analyst | 📋 | 100 घंटे |
| 4 | Ethics Guardian | ⚖️ | 300 घंटे |
| 5 | Chief Secretary | 🏛️ | Elite status |

### 3. **SSC (The Officers)** 👮
में जहाँ speed और calculation dominant है।

| Level | Badge | Icon | Criteria |
|-------|-------|------|----------|
| 1 | Cadet | 👮 | 25 घंटे |
| 2 | Inspector Mind | 🔍 | 90% accuracy |
| 3 | Math Commando | 💪 | 80+ score + 80h |
| 4 | Vigilance Officer | 🛡️ | 45 दिन streak |
| 5 | Excise Legend | 🏅 | Elite (400h + 95% + 60 दिन) |

### 4. **Railway (The Technicians)** 🚂
Technical knowledge और speed यहाँ महत्वपूर्ण है।

| Level | Badge | Icon | Criteria |
|-------|-------|------|----------|
| 1 | Station Master | 🚂 | 40 घंटे |
| 2 | Signal Clearer | 🚦 | 14 दिन streak |
| 3 | Loco Pilot | ⚙️ | 150 घंटे |
| 4 | Track Expert | 🛤️ | 30 दिन + 85% score |
| 5 | Bullet Express | 💨 | Elite (400h + 92% + 75 दिन) |

### 5. **General / Mixed (Ultimate Cracker)** 🌟
सभी exams की mix preparation करने वालों के लिए।

| Level | Badge | Icon | Criteria |
|-------|-------|------|----------|
| 1 | Knowledge Seeker | 🔍 | 30 घंटे |
| 2 | Quiz Warrior | ⚔️ | 75+ consistent |
| 3 | Syllabus Crusher | 💥 | 120 घंटे |
| 4 | Rank Climber | 📈 | 50 दिन + 85% |
| 5 | Ultimate Cracker | 🌟 | Elite champion |

---

## 🔧 Implementation Details

### File Structure
```
lib/badges/
  ├── badgeConfig.ts        # Badge definitions
  ├── userSchema.ts         # User profile schema
  └── badgeSystem.ts        # Core logic

components/ecrackerian/
  ├── badge-display.tsx     # UI components
  └── profile-badges-section.tsx

hooks/
  └── use-badge-system.ts   # React hook

app/api/
  └── badges/route.ts       # API endpoints
```

### Core Functions

#### 1. **getBadgesByStream(stream)**
किसी stream के लिए सभी badges return करें
```typescript
import { getBadgesByStream } from "@/lib/badges/badgeConfig"

const jeeeBadges = getBadgesByStream("jee")
```

#### 2. **updateUserStatsAndCheckBadges(profile, updates)**
Stats update करें और नए badges check करें
```typescript
const updatedProfile = updateUserStatsAndCheckBadges(userProfile, {
  studyHours: 50,
  streakDays: 7,
  quizScore: 85,
  mocksCompleted: 1
})
```

#### 3. **useBadgeSystem()**
React component में use करने के लिए hook
```typescript
const { 
  profile, 
  badges, 
  stats, 
  addStudyHours, 
  updateStreak,
  addQuizScore,
  completeMock
} = useBadgeSystem()
```

---

## 📱 Component Usage

### ProfileBadgesSection
Profile page में badges section:
```tsx
import { ProfileBadgesSection } from "@/components/ecrackerian/profile-badges-section"

export function ProfilePage() {
  return (
    <div>
      <ProfileBadgesSection userExam="jee" />
    </div>
  )
}
```

### BadgeDisplay
Individual badge दिखाने के लिए:
```tsx
import { BadgeDisplay } from "@/components/ecrackerian/badge-display"

<BadgeDisplay 
  badge={badge}
  isEarned={true}
  size="md"
/>
```

### BadgeGrid
सभी badges grid में:
```tsx
import { BadgeGrid } from "@/components/ecrackerian/badge-display"

<BadgeGrid 
  badges={allBadges}
  earnedBadgeIds={earnedSet}
  userProfile={userProfile}
/>
```

---

## 🚀 API Usage

### POST /api/badges

#### Update Stats
```bash
POST /api/badges
{
  "action": "update-stats",
  "updates": {
    "studyHours": 100,
    "quizScore": 85,
    "streakDays": 30
  }
}
```

#### Increment Study Hours
```bash
POST /api/badges
{
  "action": "increment-study-hours",
  "updates": {
    "hours": 2.5
  }
}
```

#### Complete Mock
```bash
POST /api/badges
{
  "action": "complete-mock"
}
```

#### Add Quiz Score
```bash
POST /api/badges
{
  "action": "add-quiz-score",
  "updates": {
    "score": 85
  }
}
```

#### Update Streak (Daily)
```bash
POST /api/badges
{
  "action": "update-streak"
}
```

---

## 📊 XP System

Badges earn करते हैं XP:
- Level 1 Badge: 150 XP
- Level 2 Badge: 200 XP
- Level 3 Badge: 250 XP
- Level 4 Badge: 300 XP
- Level 5 Badge: 350 XP

**हर 5 badges = 1 Level Up**

---

## 💾 Storage

### localStorage (Current)
```javascript
// User profile localStorage में store होता है
localStorage.setItem("userProfile", JSON.stringify(profile))
```

### MongoDB (Production के लिए)
आप चाहो तो MongoDB setup कर सकते हो:
```typescript
// models/User.ts
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  stats: {
    studyHours: Number,
    streakDays: Number,
    quizScore: Number,
    // ...
  },
  badges: [{
    badgeId: String,
    earnedAt: Date,
    // ...
  }]
})
```

---

## 🎯 How to Integrate in Your Components

### Example: Pomodoro Timer से Study Hours Add करें
```tsx
import { useBadgeSystem } from "@/hooks/use-badge-system"

export function PomodoroTimer() {
  const { addStudyHours } = useBadgeSystem()

  const handleSessionComplete = (minutes: number) => {
    const hours = minutes / 60
    addStudyHours(hours)
    // This will automatically check for new badges!
  }

  // ...
}
```

### Example: Quiz Complete होने पर
```tsx
const handleQuizSubmit = (score: number) => {
  addQuizScore(score)
  updateStreak() // Daily streak update
}
```

---

## 🎨 Customization

### Badge Colors
[badgeConfig.ts में colors update करें:]
```typescript
{
  level: 1,
  title: "Atom Starter",
  color: "bg-blue-500",  // Tailwind class
  // ...
}
```

### Badge Criteria
Criteria को आसानी से बदल सकते हैं:
```typescript
criteria: {
  studyHours: 50,      // अपना number दो
  streakDays: 30,
  quizScore: 85,
  mocksCompleted: 5
}
```

---

## ✅ Checklist

- [x] Badge configuration defined
- [x] User schema created
- [x] Core logic implemented
- [x] React components built
- [x] API routes created
- [x] Custom hooks setup
- [ ] MongoDB integration (optional)
- [ ] Notifications system (optional)
- [ ] Leaderboard (optional)
- [ ] Share badges (optional)

---

## 📞 Support

किसी समस्या के लिए अपने logs check करें:
```javascript
// Browser console में
localStorage.getItem("userProfile")  // User data see करें
```

Happy Learning! 🚀
