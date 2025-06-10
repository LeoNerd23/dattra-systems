"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { BillingStatusChart } from "../charts/billing-status-chart"

interface Faturamento {
  id: number
  cliente: string
  valor: number
  data: string
  status: "pendente" | "pago" | "cancelado"
  vencimento: string
}

export function FaturamentoPage() {
  const [faturamentos, setFaturamentos] = useLocalStorage<Faturamento[]>("faturamentos-data", [])
  const [formData, setFormData] = useState<Omit<Faturamento, "id">>({
    cliente: "",
    valor: 0,
    data: new Date().toISOString().split("T")[0],
    status: "pendente",
    vencimento: new Date().toISOString().split("T")[0],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "valor" ? Number.parseFloat(value) : value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      status: value as "pendente" | "pago" | "cancelado",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newFaturamento: Faturamento = {
      id: Date.now(),
      ...formData,
    }
    setFaturamentos([...faturamentos, newFaturamento])
    setFormData({
      cliente: "",
      valor: 0,
      data: new Date().toISOString().split("T")[0],
      status: "pendente",
      vencimento: new Date().toISOString().split("T")[0],
    })
  }

  const handleDelete = (id: number) => {
    setFaturamentos(faturamentos.filter((faturamento) => faturamento.id !== id))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const totalFaturado = faturamentos.reduce((acc, faturamento) => acc + faturamento.valor, 0)
  const totalPendente = faturamentos
    .filter((faturamento) => faturamento.status === "pendente")
    .reduce((acc, faturamento) => acc + faturamento.valor, 0)

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Faturado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalFaturado)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pendente de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPendente)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Status</CardTitle>
          <CardDescription>Visualização dos faturamentos por status</CardDescription>
        </CardHeader>
        <CardContent>
          <BillingStatusChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Novo Faturamento</CardTitle>
          <CardDescription>Registre um novo faturamento</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente</Label>
                <Input id="cliente" name="cliente" value={formData.cliente} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input
                  id="valor"
                  name="valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data">Data de Emissão</Label>
                <Input id="data" name="data" type="date" value={formData.data} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vencimento">Data de Vencimento</Label>
                <Input
                  id="vencimento"
                  name="vencimento"
                  type="date"
                  value={formData.vencimento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={handleSelectChange}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Adicionar Faturamento
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Faturamentos</CardTitle>
          <CardDescription>Lista de todos os faturamentos</CardDescription>
        </CardHeader>
        <CardContent>
          {faturamentos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum faturamento registrado</p>
            </div>
          ) : (
            <div className="border rounded-md">
              <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                <div>Cliente</div>
                <div>Valor</div>
                <div>Emissão</div>
                <div>Vencimento</div>
                <div>Status</div>
                <div className="text-right">Ações</div>
              </div>
              {faturamentos.map((faturamento) => (
                <div key={faturamento.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0">
                  <div>{faturamento.cliente}</div>
                  <div>{formatCurrency(faturamento.valor)}</div>
                  <div>{new Date(faturamento.data).toLocaleDateString("pt-BR")}</div>
                  <div>{new Date(faturamento.vencimento).toLocaleDateString("pt-BR")}</div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(faturamento.status)}`}
                    >
                      {faturamento.status.charAt(0).toUpperCase() + faturamento.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(faturamento.id)}>
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
