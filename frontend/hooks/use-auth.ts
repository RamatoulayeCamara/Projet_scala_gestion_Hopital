"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { isAuthenticated, getCurrentUser, logout } from "@/lib/auth"

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const checkAuth = () => {
      const authenticated = isAuthenticated()
      if (!authenticated) {
        router.push("/login")
      } else {
        setUser(getCurrentUser())
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await logout()
    setUser(null)
    router.push("/login")
  }

  return {
    user,
    loading,
    isAuthenticated: isAuthenticated(),
    logout: handleLogout,
  }
}
