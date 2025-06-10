"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { RevenueChart } from "../charts/revenue-chart"

interface Receita {
  id: number
  descricao: string
  valor: number
  data: string
  fonte: string
}

export function ReceitasPage() {
  const [receitas, setReceitas] = useLocalStorage<Receita[]>("receitas-data", [])
  const [formData, setFormData] = useState<Omit<Receita, "id">>({
    descricao: "",
    valor: 0,
    data: new Date().toISOString().split("T")[0],
    fonte: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "valor" ? Number.parseFloat(value) : value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newReceita: Receita = {
      id: Date.now(),
      ...formData,
    }
    setReceitas([...receitas, newReceita])
    setFormData({
      descricao: "",
      valor: 0,
      data: new Date().toISOString().split("T")[0],
      fonte: "",
    })
  }

  const handleDelete = (id: number) => {
    setReceitas(receitas.filter((receita) => receita.id !== id))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const totalReceitas = receitas.reduce((acc, receita) => acc + receita.valor, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Receita</CardTitle>
          <CardDescription>Preencha os dados para registrar uma nova receita</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  required
                />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input id="data" name="data" type="date" value={formData.data} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fonte">Fonte</Label>
                <Input id="fonte" name="fonte" value={formData.fonte} onChange={handleInputChange} required />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Adicionar Receita
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Receitas Registradas</CardTitle>
              <CardDescription>Total: {formatCurrency(totalReceitas)}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {receitas.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhuma receita registrada</p>
            </div>
          ) : (
            <div className="border rounded-md">
              <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                <div>Descrição</div>
                <div>Valor</div>
                <div>Data</div>
                <div>Fonte</div>
                <div className="text-right">Ações</div>
              </div>
              {receitas.map((receita) => (
                <div key={receita.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0">
                  <div>{receita.descricao}</div>
                  <div>{formatCurrency(receita.valor)}</div>
                  <div>{new Date(receita.data).toLocaleDateString("pt-BR")}</div>
                  <div>{receita.fonte}</div>
                  <div className="text-right">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(receita.id)}>
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Evolução das Receitas</CardTitle>
          <CardDescription>Gráfico mensal das receitas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <RevenueChart />
        </CardContent>
      </Card>
    </div>
  )
}
