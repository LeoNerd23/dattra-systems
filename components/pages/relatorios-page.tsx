"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { BarChart3, FileText, Download, PieChart, LineChart } from "lucide-react"

import { MonthlyMetricsChart } from "../charts/monthly-metrics-chart"
import { RevenueChart } from "../charts/revenue-chart"
import { BillingStatusChart } from "../charts/billing-status-chart"
import { AppointmentsChart } from "../charts/appointments-chart"

interface Relatorio {
  id: number
  titulo: string
  tipo: "financeiro" | "pacientes" | "ocupacao" | "faturamento"
  periodo: "diario" | "semanal" | "mensal" | "anual"
  dataCriacao: string
}

export function RelatoriosPage() {
  const [relatorios, setRelatorios] = useLocalStorage<Relatorio[]>("relatorios-data", [])
  const [formData, setFormData] = useState<Omit<Relatorio, "id" | "dataCriacao">>({
    titulo: "",
    tipo: "financeiro",
    periodo: "mensal",
  })

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newRelatorio: Relatorio = {
      id: Date.now(),
      ...formData,
      dataCriacao: new Date().toISOString(),
    }
    setRelatorios([...relatorios, newRelatorio])
    setFormData({
      titulo: "",
      tipo: "financeiro",
      periodo: "mensal",
    })
  }

  const handleDelete = (id: number) => {
    setRelatorios(relatorios.filter((relatorio) => relatorio.id !== id))
  }

  const tiposRelatorio = [
    { value: "financeiro", label: "Financeiro" },
    { value: "pacientes", label: "Pacientes" },
    { value: "ocupacao", label: "Ocupação" },
    { value: "faturamento", label: "Faturamento" },
  ]

  const periodosRelatorio = [
    { value: "diario", label: "Diário" },
    { value: "semanal", label: "Semanal" },
    { value: "mensal", label: "Mensal" },
    { value: "anual", label: "Anual" },
  ]

  const getRelatorioIcon = (tipo: string) => {
    switch (tipo) {
      case "financeiro":
        return <BarChart3 className="h-5 w-5 text-blue-600" />
      case "pacientes":
        return <PieChart className="h-5 w-5 text-green-600" />
      case "ocupacao":
        return <LineChart className="h-5 w-5 text-purple-600" />
      case "faturamento":
        return <BarChart3 className="h-5 w-5 text-orange-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerar Novo Relatório</CardTitle>
          <CardDescription>Selecione o tipo de relatório que deseja gerar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="titulo" className="text-sm font-medium">
                  Título do Relatório
                </label>
                <input
                  id="titulo"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file: bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Relatório</label>
                <Select value={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposRelatorio.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Período</label>
                <Select value={formData.periodo} onValueChange={(value) => handleSelectChange("periodo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodosRelatorio.map((periodo) => (
                      <SelectItem key={periodo.value} value={periodo.value}>
                        {periodo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Gerar Relatório
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Relatórios Gerados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{relatorios.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Financeiros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{relatorios.filter((r) => r.tipo === "financeiro").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{relatorios.filter((r) => r.tipo === "pacientes").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Faturamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{relatorios.filter((r) => r.tipo === "faturamento").length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Métricas Mensais Consolidadas</CardTitle>
            <CardDescription>Evolução de receitas, faturamentos e agendamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <MonthlyMetricsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receitas por Período</CardTitle>
            <CardDescription>Evolução das receitas ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status dos Faturamentos</CardTitle>
            <CardDescription>Distribuição dos faturamentos por status</CardDescription>
          </CardHeader>
          <CardContent>
            <BillingStatusChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agendamentos por Tipo</CardTitle>
            <CardDescription>Distribuição dos agendamentos por tipo e status</CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentsChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios Gerados</CardTitle>
          <CardDescription>Lista de todos os relatórios criados</CardDescription>
        </CardHeader>
        <CardContent>
          {relatorios.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum relatório gerado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {relatorios.map((relatorio) => (
                <div key={relatorio.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getRelatorioIcon(relatorio.tipo)}
                    <div>
                      <h3 className="font-medium">{relatorio.titulo}</h3>
                      <p className="text-sm text-muted-foreground">
                        {tiposRelatorio.find((t) => t.value === relatorio.tipo)?.label} •{" "}
                        {periodosRelatorio.find((p) => p.value === relatorio.periodo)?.label} •{" "}
                        {new Date(relatorio.dataCriacao).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(relatorio.id)}>
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
