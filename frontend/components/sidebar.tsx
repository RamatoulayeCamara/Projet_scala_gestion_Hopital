"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, UserCog, Home, Calendar, CreditCard, BedDouble, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Personnel",
    href: "/personnel",
    icon: UserCog,
  },
  {
    title: "Ressources",
    href: "/ressources",
    icon: BedDouble,
  },
  {
    title: "Paiements",
    href: "/paiements",
    icon: CreditCard,
  },
  {
    title: "Rendez-vous",
    href: "/rendez-vous",
    icon: Calendar,
  },
]

export function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <>
      <div
        className={cn("fixed inset-0 z-40 bg-zinc-900/70 lg:hidden", isOpen ? "block" : "hidden")}
        onClick={toggleSidebar}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-emerald-600" />
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
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-50"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 w-full border-t p-4">
          <Button
            variant="outline"
            className="w-full justify-start text-slate-700 dark:text-slate-200"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    </>
  )
}
