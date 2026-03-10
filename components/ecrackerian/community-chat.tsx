"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, Users, ChevronRight, ChevronLeft, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: number
  user: string
  avatar: string
  message: string
  time: string
  isOnline: boolean
}

interface Channel {
  id: string
  name: string
  unread: number
}

const CHANNELS: Channel[] = [
  { id: "general", name: "general", unread: 3 },
  { id: "jee-warriors", name: "jee-warriors", unread: 12 },
  { id: "neet-prep", name: "neet-prep", unread: 0 },
  { id: "doubt-clearing", name: "doubt-clearing", unread: 5 },
]

const MESSAGES: Message[] = [
  {
    id: 1,
    user: "Arjun",
    avatar: "A",
    message: "Just completed Thermodynamics! 🔥",
    time: "2m ago",
    isOnline: true,
  },
  {
    id: 2,
    user: "Priya",
    avatar: "P",
    message: "Anyone has notes for Organic Chemistry?",
    time: "5m ago",
    isOnline: true,
  },
  {
    id: 3,
    user: "Rahul",
    avatar: "R",
    message: "I can share mine. Check DM",
    time: "6m ago",
    isOnline: false,
  },
  {
    id: 4,
    user: "Sneha",
    avatar: "S",
    message: "Physics mock test score: 285/300 💪",
    time: "10m ago",
    isOnline: true,
  },
]

interface CommunityChatProps {
  isOpen: boolean
  onToggle: () => void
}

export function CommunityChat({ isOpen, onToggle }: CommunityChatProps) {
  const [activeChannel, setActiveChannel] = useState("jee-warriors")
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(MESSAGES)

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          user: "You",
          avatar: "Y",
          message: newMessage,
          time: "now",
          isOnline: true,
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <>
      {/* Toggle Button (when collapsed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={onToggle}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-primary text-primary-foreground p-3 rounded-l-xl shadow-lg flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Chat</span>
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">Cracker Group</h3>
                <Badge className="bg-chart-3/20 text-chart-3 text-xs">
                  42 online
                </Badge>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={onToggle}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Channels */}
            <div className="p-2 border-b border-border">
              <div className="flex gap-1 overflow-x-auto pb-1">
                {CHANNELS.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      activeChannel === channel.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Hash className="h-3 w-3" />
                    {channel.name}
                    {channel.unread > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px]">
                        {channel.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {msg.avatar}
                    </div>
                    {msg.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-chart-3 rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground text-sm">{msg.user}</span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-sm text-foreground/80 break-words">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="bg-secondary/50 border-border"
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button
                  size="icon"
                  onClick={sendMessage}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
