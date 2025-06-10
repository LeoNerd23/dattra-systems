"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { DollarSign, TrendingUp, Users, Calendar, CreditCard, FileText } from "lucide-react"
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

interface Paciente {
  id: number
  nome: string
  cpf: string
  dataNascimento: string
  telefone: string
  email: string
  convenio: string
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

export function DashboardStats() {
  const [receitas] = useLocalStorage<Receita[]>("receitas-data", [])
  const [faturamentos] = useLocalStorage<Faturamento[]>("faturamentos-data", [])
  const [pacientes] = useLocalStorage<Paciente[]>("pacientes-data", [])
  const [agendamentos] = useLocalStorage<Agendamento[]>("agendamentos-data", [])

  const stats = useMemo(() => {
    const totalReceitas = receitas.reduce((acc, receita) => acc + receita.valor, 0)
    const totalFaturamentos = faturamentos.reduce((acc, faturamento) => acc + faturamento.valor, 0)
    const faturamentosPagos = faturamentos.filter((f) => f.status === "pago").reduce((acc, f) => acc + f.valor, 0)
    const faturamentosPendentes = faturamentos
      .filter((f) => f.status === "pendente")
      .reduce((acc, f) => acc + f.valor, 0)

    const hoje = new Date()
    const proximosSete = new Date()
    proximosSete.setDate(hoje.getDate() + 7)

    const agendamentosProximos = agendamentos.filter((agendamento) => {
      const dataAgendamento = new Date(agendamento.data)
      return (
        dataAgendamento >= hoje &&
        dataAgendamento <= proximosSete &&
        (agendamento.status === "agendado" || agendamento.status === "confirmado")
      )
    }).length

    const agendamentosRealizados = agendamentos.filter((a) => a.status === "realizado").length
    const taxaRealizacao = agendamentos.length > 0 ? (agendamentosRealizados / agendamentos.length) * 100 : 0

    return {
      totalReceitas,
      totalFaturamentos,
      faturamentosPagos,
      faturamentosPendentes,
      totalPacientes: pacientes.length,
      agendamentosProximos,
      taxaRealizacao,
    }
  }, [receitas, faturamentos, pacientes, agendamentos])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalReceitas)}</div>
          <p className="text-xs text-muted-foreground">{receitas.length} receitas registradas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faturamento Pago</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.faturamentosPagos)}</div>
          <p className="text-xs text-muted-foreground">Pendente: {formatCurrency(stats.faturamentosPendentes)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pacientes Cadastrados</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPacientes}</div>
          <p className="text-xs text-muted-foreground">Total de pacientes no sistema</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Próximos Agendamentos</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.agendamentosProximos}</div>
          <p className="text-xs text-muted-foreground">Próximos 7 dias</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Realização</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.taxaRealizacao.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">Agendamentos realizados vs total</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resumo Financeiro</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalReceitas + stats.faturamentosPagos)}</div>
          <p className="text-xs text-muted-foreground">Receitas + Faturamentos pagos</p>
        </CardContent>
      </Card>
    </div>
  )
}
