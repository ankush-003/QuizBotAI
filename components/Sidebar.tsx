"use client"

import { useState } from "react"
import {
    Home,
    Github,
    Box,
    ChevronRight,
    ChevronLeft,
    CircleHelp,
    History,
    User,
    Brain,
    SquareLibrary,
  } from "lucide-react"
import { Nav } from '@/components/Nav'
import { Button } from '@/components/ui/button'


export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24 bg-background text-foreground">
        <div className="absolute right-[-20px] top-8">
        <Button variant={"secondary"} className="rounded-full p-2 hover:border-2 max-md:hidden hover:border-red-500">
            {isCollapsed ? (
                <ChevronRight
                className="h-6 w-6"
                onClick={() => setIsCollapsed(false)}
                />
            ) : (
                <ChevronLeft
                className="h-6 w-6"
                onClick={() => setIsCollapsed(true)}
                />
            )}
        </Button>
        </div>
        <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "dashboard",
                icon: Home,
                variant: "default",
                href: "/home",
              },
              {
                title: "library",
                icon: SquareLibrary,
                variant: "default",
                href: "/library",
              },
              {
                title: "quiz",
                icon: CircleHelp,
                variant: "default",
                href: "/quiz",
              },
              {
                title: "practice",
                icon: Brain,
                variant: "default",
                href: "/practice",
              },
              {
                title: "profile",
                icon: User,
                variant: "default",
                href: "/profile",
              },
              {
                title: "history",
                icon: History,
                variant: "default",
                href: "/history",
              },
              {
                title: "about",
                icon: Github,
                variant: "default",
                href: "https://github.com/ankush-003"
              }
            ]}
          />
    </div>
  )
}