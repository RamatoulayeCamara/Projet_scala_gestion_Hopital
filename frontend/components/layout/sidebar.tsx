"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  UserCog,
  Home,
  Calendar,
  CreditCard,
  BedDouble,
  Menu,
  LogOut,
  Shield,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Tableau de bord",
    href: "/",
    icon: BarChart3,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Rendez-vous",
    href: "/rendezvous",
    icon: Calendar,
  },
  {
    title: "Personnel",
    href: "/personnel",
    icon: UserCog,
  },
  {
    title: "Chambres",
    href: "/chambre",
    icon: Building2,
  },
  {
    title: "Matériels",
    href: "/materiels",
    icon: BedDouble,
  },
  {
    title: "Paiements",
    href: "/paiements",
    icon: CreditCard,
  },
  {
    title: "Gardes",
    href: "/garde",
    icon: Shield,
  },
  {
    title: "Hospitalisations",
    href: "/hospitalisations",
    icon: BedDouble,
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  // Fermer la sidebar sur mobile lors de la navigation
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Ne pas afficher la sidebar sur la page de connexion
  if (pathname === "/login") {
    return null
  }

  return (
    <>
      <div
        className={cn("fixed inset-0 z-40 bg-zinc-900/70 lg:hidden", isOpen ? "block" : "hidden")}
        onClick={toggleSidebar}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Werral ak Jamm</span>
          </Link>
        </div>
        <div className="py-4 px-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 w-full border-t p-4">
          <Link href="/login">
            <Button variant="outline" className="w-full justify-start text-gray-700 dark:text-gray-200">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </Link>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Menu</span>
      </Button>
    </>
  )
}
