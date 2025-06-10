"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useMemo } from "react"

interface Receita {
  id: number
  descricao: string
  valor: number
  data: string
  fonte: string
}

export function RevenueChart() {
  const [receitas] = useLocalStorage<Receita[]>("receitas-data", [])

  const chartData = useMemo(() => {
    // Agrupar receitas por mês
    const receitasPorMes = receitas.reduce(
      (acc, receita) => {
        const data = new Date(receita.data)
        const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`

        if (!acc[mesAno]) {
          acc[mesAno] = {
            mes: mesAno,
            valor: 0,
            quantidade: 0,
          }
        }

        acc[mesAno].valor += receita.valor
        acc[mesAno].quantidade += 1

        return acc
      },
      {} as Record<string, { mes: string; valor: number; quantidade: number }>,
    )

    // Converter para array e ordenar por data
    return Object.values(receitasPorMes)
      .sort((a, b) => {
        const [mesA, anoA] = a.mes.split("/").map(Number)
        const [mesB, anoB] = b.mes.split("/").map(Number)
        return anoA - anoB || mesA - mesB
      })
      .slice(-12) // Últimos 12 meses
  }, [receitas])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">Nenhuma receita registrada para exibir gráfico</p>
      </div>
    )
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={formatCurrency} />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), "Receita"]}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Area type="monotone" dataKey="valor" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
