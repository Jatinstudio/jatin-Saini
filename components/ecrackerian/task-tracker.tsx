"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Flame, Check, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Task {
  id: string
  text: string
  completed: boolean
  priority: "high" | "medium" | "low"
}

const INITIAL_TASKS: Task[] = [
  { id: "1", text: "Complete Physics Chapter 5", completed: false, priority: "high" },
  { id: "2", text: "Solve 50 Math Problems", completed: true, priority: "high" },
  { id: "3", text: "Review Chemistry Notes", completed: false, priority: "medium" },
  { id: "4", text: "Practice English Essay", completed: false, priority: "low" },
]

const PRIORITY_COLORS = {
  high: "border-l-destructive",
  medium: "border-l-primary",
  low: "border-l-accent",
}

export function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [newTask, setNewTask] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          text: newTask,
          completed: false,
          priority: "medium",
        },
      ])
      setNewTask("")
      setIsAdding(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="h-full"
    >
      <Card className="bg-card border-border h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Burner List
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {completedCount}/{totalCount} done
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mt-2">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Task List */}
          <div className="flex-1 overflow-y-auto space-y-2 max-h-[280px] pr-1">
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  className={`flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border-l-4 ${PRIORITY_COLORS[task.priority]} group`}
                >
                  <motion.button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? "bg-primary border-primary"
                        : "border-muted-foreground hover:border-primary"
                    }`}
                    whileTap={{ scale: 0.8 }}
                  >
                    {task.completed && <Check className="h-3 w-3 text-primary-foreground" />}
                  </motion.button>
                  <span
                    className={`flex-1 text-sm transition-all ${
                      task.completed
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Task */}
          <AnimatePresence mode="wait">
            {isAdding ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex gap-2 mt-4"
              >
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="bg-secondary/50 border-border"
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  autoFocus
                />
                <Button onClick={addTask} size="sm" className="bg-primary hover:bg-primary/90">
                  Add
                </Button>
                <Button 
                  onClick={() => setIsAdding(false)} 
                  size="sm" 
                  variant="ghost"
                >
                  Cancel
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  onClick={() => setIsAdding(true)}
                  variant="outline"
                  className="w-full mt-4 border-dashed border-border hover:border-primary hover:bg-primary/10"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
