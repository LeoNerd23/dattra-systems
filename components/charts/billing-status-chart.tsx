"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useMemo } from "react"

interface Faturamento {
  id: number
  cliente: string
  valor: number
  data: string
  status: "pendente" | "pago" | "cancelado"
  vencimento: string
}

const COLORS = {
  pago: "#10b981",
  pendente: "#f59e0b",
  cancelado: "#ef4444",
}

export function BillingStatusChart() {
  const [faturamentos] = useLocalStorage<Faturamento[]>("faturamentos-data", [])

  const chartData = useMemo(() => {
    const statusCount = faturamentos.reduce(
      (acc, faturamento) => {
        if (!acc[faturamento.status]) {
          acc[faturamento.status] = {
            name: faturamento.status.charAt(0).toUpperCase() + faturamento.status.slice(1),
            value: 0,
            valor: 0,
          }
        }
        acc[faturamento.status].value += 1
        acc[faturamento.status].valor += faturamento.valor
        return acc
      },
      {} as Record<string, { name: string; value: number; valor: number }>,
    )

    return Object.entries(statusCount).map(([status, data]) => ({
      ...data,
      status,
    }))
  }, [faturamentos])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">Nenhum faturamento registrado</p>
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
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.status as keyof typeof COLORS]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string, props: any) => [
              `${value} faturamentos`,
              `Total: ${formatCurrency(props.payload.valor)}`,
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
