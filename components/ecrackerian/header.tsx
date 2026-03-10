"use client"

import { Flame, User, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface HeaderProps {
  streak: number
  userName: string
}

export function Header({ streak, userName }: HeaderProps) {
  const pathname = usePathname()

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="flex items-center gap-3">
        <Link href="/">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <Zap className="h-8 w-8 text-primary fill-primary" />
              <div className="absolute inset-0 blur-lg bg-primary/40" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-primary">E</span>
              <span className="text-foreground">crackerian</span>
            </span>
          </motion.div>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <NavItem href="/" active={pathname === "/"}>Dashboard</NavItem>
        <NavItem href="/analytics" active={pathname === "/analytics"}>Analytics</NavItem>
        <NavItem href="/community" active={pathname === "/community"}>Community</NavItem>
        <NavItem href="/resources" active={pathname === "/resources"}>Resources</NavItem>
      </nav>

      <div className="flex items-center gap-4">
        <motion.div 
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="font-bold text-foreground">{streak}</span>
          <span className="text-muted-foreground text-sm">day streak</span>
        </motion.div>

        <Link href="/profile">
          <motion.div 
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary border border-border cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:block">{userName}</span>
          </motion.div>
        </Link>
      </div>
    </motion.header>
  )
}

function NavItem({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link href={href}>
      <motion.span 
        className={`text-sm font-medium transition-colors relative cursor-pointer ${
          active ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }`}
        whileHover={{ y: -2 }}
      >
        {children}
        {active && (
          <motion.div 
            layoutId="nav-indicator"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
          />
        )}
      </motion.span>
    </Link>
  )
}
