"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useMemo } from "react"

interface Receita {
  id: number
  descricao: string
  valor: number
  data: string
  fonte: string
}

interface Faturamento {
  id: number
  cliente: string
  valor: number
  data: string
  status: "pendente" | "pago" | "cancelado"
  vencimento: string
}

interface Agendamento {
  id: number
  paciente: string
  medico: string
  data: string
  hora: string
  tipo: string
  status: "agendado" | "confirmado" | "cancelado" | "realizado"
}

export function MonthlyMetricsChart() {
  const [receitas] = useLocalStorage<Receita[]>("receitas-data", [])
  const [faturamentos] = useLocalStorage<Faturamento[]>("faturamentos-data", [])
  const [agendamentos] = useLocalStorage<Agendamento[]>("agendamentos-data", [])

  const chartData = useMemo(() => {
    const metricas = {} as Record<
      string,
      {
        mes: string
        receitas: number
        faturamentos: number
        agendamentos: number
      }
    >

    // Processar receitas
    receitas.forEach((receita) => {
      const data = new Date(receita.data)
      const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`

      if (!metricas[mesAno]) {
        metricas[mesAno] = { mes: mesAno, receitas: 0, faturamentos: 0, agendamentos: 0 }
      }
      metricas[mesAno].receitas += receita.valor
    })

    // Processar faturamentos
    faturamentos.forEach((faturamento) => {
      const data = new Date(faturamento.data)
      const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`

      if (!metricas[mesAno]) {
        metricas[mesAno] = { mes: mesAno, receitas: 0, faturamentos: 0, agendamentos: 0 }
      }
      metricas[mesAno].faturamentos += faturamento.valor
    })

    // Processar agendamentos
    agendamentos.forEach((agendamento) => {
      const data = new Date(agendamento.data)
      const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`

      if (!metricas[mesAno]) {
        metricas[mesAno] = { mes: mesAno, receitas: 0, faturamentos: 0, agendamentos: 0 }
      }
      metricas[mesAno].agendamentos += 1
    })

    return Object.values(metricas)
      .sort((a, b) => {
        const [mesA, anoA] = a.mes.split("/").map(Number)
        const [mesB, anoB] = b.mes.split("/").map(Number)
        return anoA - anoB || mesA - mesB
      })
      .slice(-12)
  }, [receitas, faturamentos, agendamentos])

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
      <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">Nenhum dado disponível para exibir métricas</p>
      </div>
    )
  }

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={formatCurrency} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === "agendamentos") {
                return [value, "Agendamentos"]
              }
              return [formatCurrency(value), name === "receitas" ? "Receitas" : "Faturamentos"]
            }}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="receitas" stroke="#10b981" strokeWidth={2} name="Receitas" />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="faturamentos"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Faturamentos"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="agendamentos"
            stroke="#f59e0b"
            strokeWidth={2}
            name="Agendamentos"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
