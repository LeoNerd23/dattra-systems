"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronsUpDown, Plus, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useHospital } from "@/contexts/hospital-context"

export function HospitalSelector() {
  const { hospitalAtual, hospitais, setHospitalAtual, adicionarHospital, removerHospital } = useHospital()
  const [dialogAberto, setDialogAberto] = useState(false)
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
    const novoHospital = adicionarHospital(formData)
    setHospitalAtual(novoHospital)
    setFormData({ nome: "", cnpj: "", endereco: "", telefone: "" })
    setDialogAberto(false)
  }

  const handleSelectHospital = (hospital: any) => {
    setHospitalAtual(hospital)
  }

  const handleRemoveHospital = (hospitalId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm("Tem certeza que deseja remover este hospital? Todos os dados serão perdidos.")) {
      removerHospital(hospitalId)
    }
  }

  if (!hospitalAtual) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-sm text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="p-4 border-b">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-between h-auto p-3 text-left font-normal">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{hospitalAtual.nome}</span>
                <span className="text-xs text-muted-foreground">CNPJ: {hospitalAtual.cnpj}</span>
              </div>
            </div>
            <ChevronsUpDown className="w-4 h-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[280px]" align="start">
          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Selecionar Hospital</div>
          {hospitais.map((hospital) => (
            <DropdownMenuItem
              key={hospital.id}
              onClick={() => handleSelectHospital(hospital)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <div className="flex flex-col">
                  <span className="text-sm">{hospital.nome}</span>
                  <span className="text-xs text-muted-foreground">{hospital.cnpj}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {hospitalAtual.id === hospital.id && <Check className="w-4 h-4" />}
                {hospitais.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    onClick={(e) => handleRemoveHospital(hospital.id, e)}
                  >
                    ×
                  </Button>
                )}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Hospital
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Hospital</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do hospital para criar uma nova unidade no sistema.
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
                  <Button type="submit">Adicionar Hospital</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
