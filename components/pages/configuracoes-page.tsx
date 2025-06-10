"use client"

import { AlertDialogFooter } from "@/components/ui/alert-dialog"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { toast } from "sonner"
import { User, Users, Save, RefreshCw, CheckCircle, Building, Trash2 } from "lucide-react"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ContaInfo {
  nome: string
  email: string
  telefone: string
  cargo: string
  hospital: string
  cnpj: string
  endereco: string
}

interface Usuario {
  id: number
  nome: string
  email: string
  cargo: string
  nivel: "admin" | "gerente" | "operador" | "visualizador"
  status: "ativo" | "inativo" | "pendente"
  ultimoAcesso: string
  dataCriacao: string
}

export function ConfiguracoesPage() {
  const [contaInfo, setContaInfo] = useLocalStorage<ContaInfo>("conta-info", {
    nome: "Mariana Alcantara",
    email: "mariana.alcantara@dattra.io",
    telefone: "(11) 99999-9999",
    cargo: "Gestora de Projetos",
    hospital: "Hospital HUSF",
    cnpj: "33.495.870/0001-38",
    endereco: "Av. São Francisco de Assis - Taboão, Bragança Paulista - SP, 12916-542",
  })

  const [usuarios, setUsuarios] = useLocalStorage<Usuario[]>("usuarios-sistema", [])

  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    cargo: "",
    nivel: "operador" as const,
  })

  const [dialogUsuarioAberto, setDialogUsuarioAberto] = useState(false)
  const [salvandoConfiguracoes, setSalvandoConfiguracoes] = useState(false)

  const handleContaInfoChange = (field: keyof ContaInfo, value: string) => {
    setContaInfo((prev) => ({ ...prev, [field]: value }))

    // Toast com Sonner - muito mais elegante
    const fieldNames = {
      nome: "Nome",
      email: "Email",
      telefone: "Telefone",
      cargo: "Cargo",
      hospital: "Hospital",
      cnpj: "CNPJ",
      endereco: "Endereço",
    }

    toast.success(`${fieldNames[field]} atualizado`, {
      description: "Informação salva automaticamente",
      duration: 2000,
    })
  }

  const handleAdicionarUsuario = () => {
    if (novoUsuario.nome && novoUsuario.email && novoUsuario.cargo) {
      const usuario: Usuario = {
        id: Date.now(),
        ...novoUsuario,
        status: "pendente",
        ultimoAcesso: "",
        dataCriacao: new Date().toISOString().split("T")[0],
      }
      setUsuarios((prev) => [...prev, usuario])
      setNovoUsuario({ nome: "", email: "", cargo: "", nivel: "operador" })
      setDialogUsuarioAberto(false)

      toast.success("Usuário adicionado com sucesso", {
        description: `${usuario.nome} foi adicionado ao sistema`,
        duration: 3000,
      })
    } else {
      toast.error("Campos obrigatórios", {
        description: "Preencha todos os campos para adicionar o usuário",
        duration: 3000,
      })
    }
  }

  const handleRemoverUsuario = (id: number) => {
    const usuario = usuarios.find((u) => u.id === id)
    setUsuarios((prev) => prev.filter((u) => u.id !== id))

    toast.success("Usuário removido", {
      description: `${usuario?.nome} foi removido do sistema`,
      duration: 3000,
    })
  }

  const handleAlterarStatusUsuario = (id: number, status: "ativo" | "inativo") => {
    const usuario = usuarios.find((u) => u.id === id)
    setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)))

    toast.success("Status alterado", {
      description: `${usuario?.nome} foi ${status === "ativo" ? "ativado" : "desativado"}`,
      duration: 3000,
    })
  }

  const handleSalvarConfiguracoes = async () => {
    setSalvandoConfiguracoes(true)

    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSalvandoConfiguracoes(false)

    toast.success("Configurações salvas", {
      description: "Todas as alterações foram salvas com sucesso",
      duration: 3000,
    })
  }

  const getNivelBadge = (nivel: string) => {
    const cores = {
      admin: "bg-red-100 text-red-800",
      gerente: "bg-blue-100 text-blue-800",
      operador: "bg-green-100 text-green-800",
      visualizador: "bg-gray-100 text-gray-800",
    }
    return cores[nivel as keyof typeof cores] || cores.visualizador
  }

  const getStatusBadge = (status: string) => {
    const cores = {
      ativo: "bg-green-100 text-green-800",
      inativo: "bg-red-100 text-red-800",
      pendente: "bg-yellow-100 text-yellow-800",
    }
    return cores[status as keyof typeof cores] || cores.pendente
  }

  return (
    <div className="space-y-8">
      {/* Informações da Conta */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <CardTitle>Informações da Conta</CardTitle>
          </div>
          <CardDescription>Gerencie suas informações pessoais e do hospital</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <User className="h-4 w-4" />
                Dados Pessoais
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={contaInfo.nome}
                    onChange={(e) => handleContaInfoChange("nome", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contaInfo.email}
                    onChange={(e) => handleContaInfoChange("email", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={contaInfo.telefone}
                    onChange={(e) => handleContaInfoChange("telefone", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input
                    id="cargo"
                    value={contaInfo.cargo}
                    onChange={(e) => handleContaInfoChange("cargo", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <Building className="h-4 w-4" />
                Dados do Hospital
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="hospital">Nome do Hospital</Label>
                  <Input
                    id="hospital"
                    value={contaInfo.hospital}
                    onChange={(e) => handleContaInfoChange("hospital", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={contaInfo.cnpj}
                    onChange={(e) => handleContaInfoChange("cnpj", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Textarea
                    id="endereco"
                    value={contaInfo.endereco}
                    onChange={(e) => handleContaInfoChange("endereco", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <Button onClick={handleSalvarConfiguracoes} disabled={salvandoConfiguracoes} className="cursor-pointer">
              {salvandoConfiguracoes ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Salvar Alterações
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Última atualização: {new Date().toLocaleString("pt-BR")}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gerenciamento de Usuários */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>
                  {usuarios.length === 0
                    ? "Adicione usuários para controlar o acesso ao sistema"
                    : `Controle de acesso e permissões do sistema (${usuarios.length} usuários)`}
                </CardDescription>
              </div>
            </div>
            <Dialog open={dialogUsuarioAberto} onOpenChange={setDialogUsuarioAberto}>
              <DialogTrigger asChild>
                <Button className="cursor-pointer">
                  <Users className="h-4 w-4 mr-2" />
                  Adicionar Usuário
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                  <DialogDescription>Preencha os dados para criar um novo acesso ao sistema</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="novo-nome">Nome Completo</Label>
                    <Input
                      id="novo-nome"
                      value={novoUsuario.nome}
                      onChange={(e) => setNovoUsuario((prev) => ({ ...prev, nome: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="novo-email">Email</Label>
                    <Input
                      id="novo-email"
                      type="email"
                      value={novoUsuario.email}
                      onChange={(e) => setNovoUsuario((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="novo-cargo">Cargo</Label>
                    <Input
                      id="novo-cargo"
                      value={novoUsuario.cargo}
                      onChange={(e) => setNovoUsuario((prev) => ({ ...prev, cargo: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="novo-nivel">Nível de Acesso</Label>
                    <Select
                      value={novoUsuario.nivel}
                      onValueChange={(value) => setNovoUsuario((prev) => ({ ...prev, nivel: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visualizador">Visualizador</SelectItem>
                        <SelectItem value="operador">Operador</SelectItem>
                        <SelectItem value="gerente">Gerente</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdicionarUsuario} className="cursor-pointer">Adicionar Usuário</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usuarios.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium mb-2">Nenhum usuário cadastrado</p>
                <p className="text-gray-400 text-sm mb-4">Comece adicionando o primeiro usuário ao sistema</p>
                <Button onClick={() => setDialogUsuarioAberto(true)} className="mt-2 cursor-pointer">
                  <Users className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Usuário
                </Button>
              </div>
            ) : (
              usuarios.map((usuario) => (
                <div key={usuario.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{usuario.nome}</div>
                      <div className="text-sm text-muted-foreground">{usuario.email}</div>
                      <div className="text-sm text-muted-foreground">{usuario.cargo}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getNivelBadge(usuario.nivel)}>{usuario.nivel}</Badge>
                    <Badge className={getStatusBadge(usuario.status)}>{usuario.status}</Badge>
                    <div className="text-sm text-muted-foreground">
                      {usuario.ultimoAcesso ? (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {new Date(usuario.ultimoAcesso).toLocaleDateString("pt-BR")}
                        </div>
                      ) : (
                        "Nunca acessou"
                      )}
                    </div>
                    <div className="flex gap-2">
                      {usuario.status === "ativo" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAlterarStatusUsuario(usuario.id, "inativo")}
                          className="cursor-pointer"
                        >
                          Desativar
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAlterarStatusUsuario(usuario.id, "ativo")}
                          className="cursor-pointer"
                        >
                          Ativar
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="cursor-pointer">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remover usuário</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja remover {usuario.nome}? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRemoverUsuario(usuario.id)} className="cursor-pointer">
                              Remover
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
