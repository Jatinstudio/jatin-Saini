"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { day: "Mon", you: 4, topper: 8 },
  { day: "Tue", you: 5, topper: 9 },
  { day: "Wed", you: 6, topper: 8.5 },
  { day: "Thu", you: 4.5, topper: 10 },
  { day: "Fri", you: 7, topper: 9 },
  { day: "Sat", you: 8, topper: 10 },
  { day: "Sun", you: 6, topper: 8 },
]

interface SuccessGraphProps {
  topperAvg?: number
  yourAvg?: number
}

export function SuccessGraph({ topperAvg = 8.9, yourAvg = 5.8 }: SuccessGraphProps) {
  const gap = ((topperAvg - yourAvg) / topperAvg * 100).toFixed(1)
  const efficiency = ((yourAvg / topperAvg) * 100).toFixed(0)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="bg-card border-border h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="text-primary">Topper</span> vs <span className="text-accent">Me</span>
            </CardTitle>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-destructive">
                <TrendingDown className="h-4 w-4" />
                <span>{gap}% gap</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="topper" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  name="Topper"
                />
                <Line 
                  type="monotone" 
                  dataKey="you" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--accent))", strokeWidth: 2 }}
                  name="You"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground">Your Avg</p>
              <p className="text-xl font-bold text-accent">{yourAvg}h</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground">Topper Avg</p>
              <p className="text-xl font-bold text-primary">{topperAvg}h</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
              <p className="text-xs text-muted-foreground">Efficiency</p>
              <p className="text-xl font-bold text-foreground">{efficiency}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
