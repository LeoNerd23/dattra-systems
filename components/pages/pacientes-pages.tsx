"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PatientsInsuranceChart } from "../charts/patients-insurance-chart"

interface Paciente {
  id: number
  nome: string
  cpf: string
  dataNascimento: string
  telefone: string
  email: string
  convenio: string
}

export function PacientesPage() {
  const [pacientes, setPacientes] = useLocalStorage<Paciente[]>("pacientes-data", [])
  const [formData, setFormData] = useState<Omit<Paciente, "id">>({
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    convenio: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleConvenioChange = (value: string) => {
    setFormData({
      ...formData,
      convenio: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPaciente: Paciente = {
      id: Date.now(),
      ...formData,
    }
    setPacientes([...pacientes, newPaciente])
    setFormData({
      nome: "",
      cpf: "",
      dataNascimento: "",
      telefone: "",
      email: "",
      convenio: "",
    })
  }

  const handleDelete = (id: number) => {
    setPacientes(pacientes.filter((paciente) => paciente.id !== id))
  }

  const convenios = ["Unimed", "Amil", "Bradesco Saúde", "SulAmérica", "Particular", "Outro"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cadastrar Novo Paciente</CardTitle>
          <CardDescription>Preencha os dados para cadastrar um novo paciente</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" name="cpf" value={formData.cpf} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  name="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="convenio">Convênio</Label>
                <Select value={formData.convenio} onValueChange={handleConvenioChange}>
                  <SelectTrigger id="convenio">
                    <SelectValue placeholder="Selecione o convênio" />
                  </SelectTrigger>
                  <SelectContent>
                    {convenios.map((convenio) => (
                      <SelectItem key={convenio} value={convenio}>
                        {convenio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Cadastrar Paciente
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Pacientes Cadastrados</CardTitle>
              <CardDescription>Total: {pacientes.length} pacientes</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {pacientes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum paciente cadastrado</p>
            </div>
          ) : (
            <div className="border rounded-md overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Nome</th>
                    <th className="px-4 py-3 text-left">CPF</th>
                    <th className="px-4 py-3 text-left">Data de Nascimento</th>
                    <th className="px-4 py-3 text-left">Telefone</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Convênio</th>
                    <th className="px-4 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pacientes.map((paciente) => (
                    <tr key={paciente.id} className="border-b last:border-0">
                      <td className="px-4 py-3">{paciente.nome}</td>
                      <td className="px-4 py-3">{paciente.cpf}</td>
                      <td className="px-4 py-3">
                        {paciente.dataNascimento ? new Date(paciente.dataNascimento).toLocaleDateString("pt-BR") : ""}
                      </td>
                      <td className="px-4 py-3">{paciente.telefone}</td>
                      <td className="px-4 py-3">{paciente.email}</td>
                      <td className="px-4 py-3">{paciente.convenio}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(paciente.id)}>
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Convênio</CardTitle>
          <CardDescription>Pacientes agrupados por tipo de convênio</CardDescription>
        </CardHeader>
        <CardContent>
          <PatientsInsuranceChart />
        </CardContent>
      </Card>
    </div>
  )
}
