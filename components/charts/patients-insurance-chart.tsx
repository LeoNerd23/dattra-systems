"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useMemo } from "react"

interface Paciente {
  id: number
  nome: string
  cpf: string
  dataNascimento: string
  telefone: string
  email: string
  convenio: string
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16"]

export function PatientsInsuranceChart() {
  const [pacientes] = useLocalStorage<Paciente[]>("pacientes-data", [])

  const chartData = useMemo(() => {
    const convenioCount = pacientes.reduce(
      (acc, paciente) => {
        const convenio = paciente.convenio || "Não informado"
        if (!acc[convenio]) {
          acc[convenio] = {
            name: convenio,
            value: 0,
          }
        }
        acc[convenio].value += 1
        return acc
      },
      {} as Record<string, { name: string; value: number }>,
    )

    return Object.values(convenioCount)
  }, [pacientes])

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">Nenhum paciente cadastrado</p>
      </div>
    )
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
