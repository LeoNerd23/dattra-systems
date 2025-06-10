"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Hospital {
  id: string
  nome: string
  cnpj: string
  endereco: string
  telefone: string
  dataCriacao: string
}

interface HospitalContextType {
  hospitalAtual: Hospital | null
  hospitais: Hospital[]
  setHospitalAtual: (hospital: Hospital) => void
  adicionarHospital: (hospital: Omit<Hospital, "id" | "dataCriacao">) => void
  removerHospital: (id: string) => void
  atualizarHospital: (id: string, dados: Partial<Hospital>) => void
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

export function useHospital() {
  const context = useContext(HospitalContext)
  if (context === undefined) {
    throw new Error("useHospital deve ser usado dentro de um HospitalProvider")
  }
  return context
}

export function HospitalProvider({ children }: { children: React.ReactNode }) {
  const [hospitalAtual, setHospitalAtual] = useState<Hospital | null>(null)
  const [hospitais, setHospitais] = useState<Hospital[]>([])

  // Carregar hospitais do localStorage na inicialização
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const hospitaisSalvos = localStorage.getItem("dattra-hospitais")
        const hospitalAtualId = localStorage.getItem("dattra-hospital-atual")

        if (hospitaisSalvos) {
          const hospitaisData = JSON.parse(hospitaisSalvos)
          setHospitais(hospitaisData)

          // Definir hospital atual
          if (hospitalAtualId) {
            const hospital = hospitaisData.find((h: Hospital) => h.id === hospitalAtualId)
            if (hospital) {
              setHospitalAtual(hospital)
            } else if (hospitaisData.length > 0) {
              setHospitalAtual(hospitaisData[0])
            }
          } else if (hospitaisData.length > 0) {
            setHospitalAtual(hospitaisData[0])
          }
        } else {
          // Criar hospital padrão se não existir nenhum
          const hospitalPadrao: Hospital = {
            id: "hospital-1",
            nome: "Hospital Principal",
            cnpj: "00.000.000/0001-00",
            endereco: "Rua Principal, 123",
            telefone: "(11) 99999-9999",
            dataCriacao: new Date().toISOString(),
          }
          setHospitais([hospitalPadrao])
          setHospitalAtual(hospitalPadrao)
          localStorage.setItem("dattra-hospitais", JSON.stringify([hospitalPadrao]))
          localStorage.setItem("dattra-hospital-atual", hospitalPadrao.id)
        }
      } catch (error) {
        console.error("Erro ao carregar hospitais:", error)
      }
    }
  }, [])

  // Salvar no localStorage quando hospitais mudarem
  useEffect(() => {
    if (typeof window !== "undefined" && hospitais.length > 0) {
      localStorage.setItem("dattra-hospitais", JSON.stringify(hospitais))
    }
  }, [hospitais])

  // Salvar hospital atual no localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && hospitalAtual) {
      localStorage.setItem("dattra-hospital-atual", hospitalAtual.id)
    }
  }, [hospitalAtual])

  const adicionarHospital = (dadosHospital: Omit<Hospital, "id" | "dataCriacao">) => {
    const novoHospital: Hospital = {
      ...dadosHospital,
      id: `hospital-${Date.now()}`,
      dataCriacao: new Date().toISOString(),
    }
    setHospitais((prev) => [...prev, novoHospital])
    return novoHospital
  }

  const removerHospital = (id: string) => {
    if (hospitais.length <= 1) {
      alert("Não é possível remover o último hospital")
      return
    }

    setHospitais((prev) => prev.filter((h) => h.id !== id))

    // Se o hospital removido era o atual, selecionar outro
    if (hospitalAtual?.id === id) {
      const outroHospital = hospitais.find((h) => h.id !== id)
      if (outroHospital) {
        setHospitalAtual(outroHospital)
      }
    }
  }

  const atualizarHospital = (id: string, dados: Partial<Hospital>) => {
    setHospitais((prev) => prev.map((h) => (h.id === id ? { ...h, ...dados } : h)))

    // Atualizar hospital atual se for o mesmo
    if (hospitalAtual?.id === id) {
      setHospitalAtual((prev) => (prev ? { ...prev, ...dados } : null))
    }
  }

  return (
    <HospitalContext.Provider
      value={{
        hospitalAtual,
        hospitais,
        setHospitalAtual,
        adicionarHospital,
        removerHospital,
        atualizarHospital,
      }}
    >
      {children}
    </HospitalContext.Provider>
  )
}
