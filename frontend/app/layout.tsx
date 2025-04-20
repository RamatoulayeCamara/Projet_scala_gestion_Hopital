import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/layout/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Werral ak Jamm - Gestion Hospitalière",
  description: "Application de gestion hospitalière",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={inter.className}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex h-screen overflow-hidden font-sans">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
