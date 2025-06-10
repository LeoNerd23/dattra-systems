"use client"

import { useState, useEffect } from "react"
import { HomePage } from "./components/home-page"
import { Dashboard } from "./components/dashboard"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState("Dashboard")

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  // Gerenciar navegação baseada em hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        // Mapear hashes para nomes de páginas
        const pageMap: Record<string, string> = {
          dashboard: "Dashboard",
          receitas: "Receitas",
          faturamento: "Faturamento",
          calculadora: "Calculadora",
          relatorios: "Relatórios",
          pacientes: "Pacientes",
          agendamentos: "Agendamentos",
          performance: "Performance",
          documentos: "Documentos",
          configuracoes: "Configurações",
        }

        const page = pageMap[hash.toLowerCase()] || "Dashboard"
        setCurrentPage(page)

        // Debug
        console.log(`Hash: ${hash}, Page: ${page}`)
      } else {
        setCurrentPage("Dashboard")
      }
    }

    // Verificar hash inicial
    handleHashChange()

    // Adicionar listener para mudanças de hash
    window.addEventListener("hashchange", handleHashChange)

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} currentPage={currentPage} />
      ) : (
        <HomePage onLogin={handleLogin} />
      )}
    </div>
  )
}
