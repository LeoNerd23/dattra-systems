"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useHospital } from "@/contexts/hospital-context"
import { Building2, Edit, Trash2, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ConfiguracoesPage() {
  const { hospitais, hospitalAtual, adicionarHospital, removerHospital, atualizarHospital } = useHospital()
  const [dialogAberto, setDialogAberto] = useState(false)
  const [editandoHospital, setEditandoHospital] = useState<any>(null)
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    endereco: "",
    telefone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editandoHospital) {
      atualizarHospital(editandoHospital.id, formData)
    } else {
      adicionarHospital(formData) // This doesn't need the return value here
    }
    setFormData({ nome: "", cnpj: "", endereco: "", telefone: "" })
    setEditandoHospital(null)
    setDialogAberto(false)
  }

  const handleEdit = (hospital: any) => {
    setEditandoHospital(hospital)
    setFormData({
      nome: hospital.nome,
      cnpj: hospital.cnpj,
      endereco: hospital.endereco,
      telefone: hospital.telefone,
    })
    setDialogAberto(true)
  }

  const handleDelete = (hospitalId: string) => {
    if (confirm("Tem certeza que deseja remover este hospital? Todos os dados serão perdidos.")) {
      removerHospital(hospitalId)
    }
  }

  const handleNewHospital = () => {
    setEditandoHospital(null)
    setFormData({ nome: "", cnpj: "", endereco: "", telefone: "" })
    setDialogAberto(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gerenciar Hospitais</CardTitle>
              <CardDescription>Configure e gerencie os hospitais do sistema</CardDescription>
            </div>
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <Button onClick={handleNewHospital} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Hospital
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>{editandoHospital ? "Editar Hospital" : "Adicionar Novo Hospital"}</DialogTitle>
                    <DialogDescription>
                      {editandoHospital
                        ? "Atualize os dados do hospital."
                        : "Preencha os dados do hospital para criar uma nova unidade no sistema."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nome" className="text-right">
                        Nome
                      </Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="cnpj" className="text-right">
                        CNPJ
                      </Label>
                      <Input
                        id="cnpj"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="endereco" className="text-right">
                        Endereço
                      </Label>
                      <Input
                        id="endereco"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="telefone" className="text-right">
                        Telefone
                      </Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">{editandoHospital ? "Atualizar" : "Adicionar"} Hospital</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {hospitais.map((hospital) => (
              <Card key={hospital.id} className={hospitalAtual?.id === hospital.id ? "border-blue-500" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {hospital.nome}
                          {hospitalAtual?.id === hospital.id && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Atual</span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">CNPJ: {hospital.cnpj}</p>
                        <p className="text-sm text-muted-foreground">{hospital.endereco}</p>
                        <p className="text-sm text-muted-foreground">Tel: {hospital.telefone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(hospital)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {hospitais.length > 1 && (
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(hospital.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Sistema</CardTitle>
          <CardDescription>Dados sobre o uso do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{hospitais.length}</div>
              <div className="text-sm text-muted-foreground">Hospitais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {hospitalAtual ? new Date(hospitalAtual.dataCriacao).toLocaleDateString("pt-BR") : "-"}
              </div>
              <div className="text-sm text-muted-foreground">Data de Criação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">v1.0.0</div>
              <div className="text-sm text-muted-foreground">Versão do Sistema</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Ativo</div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
