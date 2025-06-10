"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useMemo } from "react"

interface Agendamento {
  id: number
  paciente: string
  medico: string
  data: string
  hora: string
  tipo: string
  status: "agendado" | "confirmado" | "cancelado" | "realizado"
}

export function AppointmentsChart() {
  const [agendamentos] = useLocalStorage<Agendamento[]>("agendamentos-data", [])

  const chartData = useMemo(() => {
    const tipoCount = agendamentos.reduce(
      (acc, agendamento) => {
        const tipo = agendamento.tipo.charAt(0).toUpperCase() + agendamento.tipo.slice(1)
        if (!acc[tipo]) {
          acc[tipo] = {
            tipo,
            total: 0,
            agendado: 0,
            confirmado: 0,
            realizado: 0,
            cancelado: 0,
          }
        }
        acc[tipo].total += 1
        acc[tipo][agendamento.status] += 1
        return acc
      },
      {} as Record<string, any>,
    )

    return Object.values(tipoCount)
  }, [agendamentos])

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">Nenhum agendamento registrado</p>
      </div>
    )
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tipo" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="agendado" stackId="a" fill="#3b82f6" name="Agendado" />
          <Bar dataKey="confirmado" stackId="a" fill="#10b981" name="Confirmado" />
          <Bar dataKey="realizado" stackId="a" fill="#8b5cf6" name="Realizado" />
          <Bar dataKey="cancelado" stackId="a" fill="#ef4444" name="Cancelado" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
