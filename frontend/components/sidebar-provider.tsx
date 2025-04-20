"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"

interface SidebarContextType {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}

export const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true)
  const pathname = usePathname()

  // Close sidebar on mobile when navigating
  React.useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }, [pathname])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Don't show sidebar on login page
  if (pathname === "/login") {
    return <>{children}</>
  }

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">{children}</main>
      </div>
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
