"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { AppointmentsChart } from "../charts/appointments-chart"

interface Agendamento {
  id: number
  paciente: string
  medico: string
  data: string
  hora: string
  tipo: string
  status: "agendado" | "confirmado" | "cancelado" | "realizado"
}

export function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useLocalStorage<Agendamento[]>("agendamentos-data", [])
  const [formData, setFormData] = useState<Omit<Agendamento, "id">>({
    paciente: "",
    medico: "",
    data: new Date().toISOString().split("T")[0],
    hora: "08:00",
    tipo: "consulta",
    status: "agendado",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAgendamento: Agendamento = {
      id: Date.now(),
      ...formData,
    }
    setAgendamentos([...agendamentos, newAgendamento])
    setFormData({
      paciente: "",
      medico: "",
      data: new Date().toISOString().split("T")[0],
      hora: "08:00",
      tipo: "consulta",
      status: "agendado",
    })
  }

  const handleDelete = (id: number) => {
    setAgendamentos(agendamentos.filter((agendamento) => agendamento.id !== id))
  }

  const handleChangeStatus = (id: number, status: "agendado" | "confirmado" | "cancelado" | "realizado") => {
    setAgendamentos(
      agendamentos.map((agendamento) => (agendamento.id === id ? { ...agendamento, status } : agendamento)),
    )
  }

  const tiposConsulta = ["consulta", "exame", "retorno", "cirurgia"]
  const statusOptions = ["agendado", "confirmado", "cancelado", "realizado"]

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "agendado":
        return "bg-blue-100 text-blue-800"
      case "confirmado":
        return "bg-green-100 text-green-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      case "realizado":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Agrupar agendamentos por data
  const agendamentosPorData = agendamentos.reduce(
    (acc, agendamento) => {
      const data = agendamento.data
      if (!acc[data]) {
        acc[data] = []
      }
      acc[data].push(agendamento)
      return acc
    },
    {} as Record<string, Agendamento[]>,
  )

  // Ordenar datas
  const datasOrdenadas = Object.keys(agendamentosPorData).sort()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Novo Agendamento</CardTitle>
          <CardDescription>Agende uma nova consulta ou procedimento</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paciente">Paciente</Label>
                <Input id="paciente" name="paciente" value={formData.paciente} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medico">Médico</Label>
                <Input id="medico" name="medico" value={formData.medico} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input id="data" name="data" type="date" value={formData.data} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora">Hora</Label>
                <Input id="hora" name="hora" type="time" value={formData.hora} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposConsulta.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Agendar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agendamentos</CardTitle>
          <CardDescription>Total: {agendamentos.length} agendamentos</CardDescription>
        </CardHeader>
        <CardContent>
          {agendamentos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum agendamento registrado</p>
            </div>
          ) : (
            <div className="space-y-6">
              {datasOrdenadas.map((data) => (
                <div key={data} className="space-y-2">
                  <h3 className="font-medium">
                    {new Date(data).toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                      <div>Hora</div>
                      <div>Paciente</div>
                      <div>Médico</div>
                      <div>Tipo</div>
                      <div>Status</div>
                      <div className="text-right">Ações</div>
                    </div>
                    {agendamentosPorData[data]
                      .sort((a, b) => a.hora.localeCompare(b.hora))
                      .map((agendamento) => (
                        <div key={agendamento.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0">
                          <div>{agendamento.hora}</div>
                          <div>{agendamento.paciente}</div>
                          <div>{agendamento.medico}</div>
                          <div>{agendamento.tipo.charAt(0).toUpperCase() + agendamento.tipo.slice(1)}</div>
                          <div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(agendamento.status)}`}
                            >
                              {agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
                            </span>
                          </div>
                          <div className="text-right flex justify-end gap-2">
                            <Select
                              value={agendamento.status}
                              onValueChange={(value) =>
                                handleChangeStatus(
                                  agendamento.id,
                                  value as "agendado" | "confirmado" | "cancelado" | "realizado",
                                )
                              }
                            >
                              <SelectTrigger className="h-8 w-32">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                {statusOptions.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(agendamento.id)}>
                              Excluir
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
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
  )
}
