// Simule un service d'authentification avec JWT

interface User {
  id: string
  name: string
  email: string
  role: string
}

// Fonction pour se connecter
export async function login(username: string, password: string): Promise<User> {
  // Dans une application réelle, vous feriez un appel API ici
  return new Promise((resolve, reject) => {
    // Simuler une vérification d'identifiants
    if (username === "admin" && password === "password") {
      const user = {
        id: "1",
        name: "Administrateur",
        email: "admin@werralakjamm.sn",
        role: "admin",
      }

      // Stocker le token JWT dans localStorage
      const token = "fake_jwt_token_" + Math.random().toString(36).substring(2)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      resolve(user)
    } else {
      reject(new Error("Identifiants invalides"))
    }
  })
}

// Fonction pour se déconnecter
export async function logout(): Promise<void> {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  return Promise.resolve()
}

// Fonction pour vérifier si l'utilisateur est connecté
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("token")
}

// Fonction pour récupérer l'utilisateur actuel
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userJson = localStorage.getItem("user")
  if (!userJson) return null
  return JSON.parse(userJson)
}

// Fonction pour récupérer le token JWT
export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}
