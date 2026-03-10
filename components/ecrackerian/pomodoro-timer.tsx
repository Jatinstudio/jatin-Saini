"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, Volume2, VolumeX, Brain, Coffee } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const LOFI_TRACKS = [
  { id: 1, name: "Rainy Cafe", icon: "🌧️" },
  { id: 2, name: "Night Study", icon: "🌙" },
  { id: 3, name: "Forest Focus", icon: "🌲" },
  { id: 4, name: "Ocean Waves", icon: "🌊" },
]

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isDeepWork, setIsDeepWork] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(false)
  const [activeTrack, setActiveTrack] = useState<number | null>(null)
  const [mode, setMode] = useState<"focus" | "break">("focus")

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const progress = mode === "focus" 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (mode === "focus") {
        setMode("break")
        setTimeLeft(5 * 60)
      } else {
        setMode("focus")
        setTimeLeft(isDeepWork ? 50 * 60 : 25 * 60)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, mode, isDeepWork])

  const toggleTimer = useCallback(() => setIsRunning(!isRunning), [isRunning])
  
  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(isDeepWork ? 50 * 60 : 25 * 60)
    setMode("focus")
  }, [isDeepWork])

  const toggleDeepWork = useCallback(() => {
    setIsDeepWork(!isDeepWork)
    if (!isRunning) {
      setTimeLeft(!isDeepWork ? 50 * 60 : 25 * 60)
    }
  }, [isDeepWork, isRunning])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-card border-border h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              {mode === "focus" ? (
                <>
                  <Brain className="h-5 w-5 text-primary" />
                  Focus Mode
                </>
              ) : (
                <>
                  <Coffee className="h-5 w-5 text-accent" />
                  Break Time
                </>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Deep Work</span>
              <Switch 
                checked={isDeepWork} 
                onCheckedChange={toggleDeepWork}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {/* Timer Circle */}
          <div className="relative w-40 h-40 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="8"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={mode === "focus" ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * progress) / 100}
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 - (440 * progress) / 100 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-mono font-bold text-foreground">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {isDeepWork ? "50 min session" : "25 min session"}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mb-4">
            <Button
              size="icon"
              variant="outline"
              onClick={resetTimer}
              className="rounded-full border-border"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={toggleTimer}
                className={`rounded-full px-8 ${
                  isRunning 
                    ? "bg-destructive hover:bg-destructive/90" 
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isRunning ? (
                  <Pause className="h-5 w-5 mr-2" />
                ) : (
                  <Play className="h-5 w-5 mr-2" />
                )}
                {isRunning ? "Pause" : "Start"}
              </Button>
            </motion.div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setIsSoundOn(!isSoundOn)}
              className="rounded-full border-border"
            >
              {isSoundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>

          {/* Lofi Tracks */}
          <AnimatePresence>
            {isSoundOn && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full"
              >
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {LOFI_TRACKS.map((track) => (
                    <motion.button
                      key={track.id}
                      onClick={() => setActiveTrack(activeTrack === track.id ? null : track.id)}
                      className={`p-2 rounded-lg text-center transition-all ${
                        activeTrack === track.id
                          ? "bg-primary/20 border border-primary"
                          : "bg-secondary/50 border border-transparent hover:border-border"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg">{track.icon}</span>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{track.name}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
