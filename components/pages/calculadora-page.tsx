"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { History, RotateCcw, AlertCircle, Calculator, User, Users, Hospital } from "lucide-react"
import CalculationResult from "@/components/calculation-result"
import LoadingOverlay from "@/components/loading-overlay"
import HistoryList from "@/components/history-list"
import type { MedicalFeeInput, MedicalFeeResult } from "@/types/calculation"
import {
  calculateMedicalFees,
  saveCalculationToHistory,
  formatCurrency,
  getCalculationHistory,
} from "@/utils/calculation"
import { toast } from "sonner"

export function CalculadoraPage() {
  const [incrementoEnabled, setIncrementoEnabled] = useState(false)
  const [anestesistaEnabled, setAnestesistaEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState<MedicalFeeResult[]>([])

  const initialFormData: MedicalFeeInput = {
    codigo: "",
    quantidadePontos: "",
    valorSP: "",
    valorSH: "",
    valorTSP: "",
    incremento: "",
    quantidadeAuxiliares: "0",
  }

  const [formData, setFormData] = useState<MedicalFeeInput>(initialFormData)
  const [calculationResult, setCalculationResult] = useState<MedicalFeeResult | null>(null)

  // Carregar histórico ao montar o componente
  useEffect(() => {
    setHistory(getCalculationHistory())
  }, [])

  const validateCodigo = (codigo: string) => {
    const numbers = codigo.replace(/\D/g, "")
    if (numbers.length !== 10) {
      return "O código deve ter exatamente 10 dígitos"
    }
    if (!numbers.startsWith("0")) {
      return "O código deve começar com 0"
    }
    return ""
  }

  const formatCode = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "")

    // Limita a 10 dígitos
    const limitedNumbers = numbers.slice(0, 10)

    // Aplica a máscara xx.xx.xx.xxx-x apenas se houver números
    if (limitedNumbers.length === 0) return ""

    let formatted = limitedNumbers

    if (limitedNumbers.length > 2) {
      formatted = limitedNumbers.slice(0, 2) + "." + limitedNumbers.slice(2)
    }
    if (limitedNumbers.length > 4) {
      formatted = limitedNumbers.slice(0, 2) + "." + limitedNumbers.slice(2, 4) + "." + limitedNumbers.slice(4)
    }
    if (limitedNumbers.length > 6) {
      formatted =
        limitedNumbers.slice(0, 2) +
        "." +
        limitedNumbers.slice(2, 4) +
        "." +
        limitedNumbers.slice(4, 6) +
        "." +
        limitedNumbers.slice(6)
    }
    if (limitedNumbers.length > 9) {
      formatted =
        limitedNumbers.slice(0, 2) +
        "." +
        limitedNumbers.slice(2, 4) +
        "." +
        limitedNumbers.slice(4, 6) +
        "." +
        limitedNumbers.slice(6, 9) +
        "-" +
        limitedNumbers.slice(9)
    }

    return formatted
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === "codigo") {
      const formatted = formatCode(value)
      setFormData((prev) => ({ ...prev, [field]: formatted }))

      // Validar código
      const error = validateCodigo(formatted)
      setErrors((prev) => ({ ...prev, codigo: error }))
    } else if (field === "valorSP" || field === "valorSH" || field === "valorTSP") {
      // Remove tudo que não é número
      const numbers = value.replace(/\D/g, "")

      // Converte para centavos
      const amount = Number.parseFloat(numbers) / 100

      // Formata como moeda brasileira
      if (isNaN(amount)) {
        setFormData((prev) => ({ ...prev, [field]: "" }))
      } else {
        const formatted = formatCurrency(amount)
        setFormData((prev) => ({ ...prev, [field]: formatted }))
      }
    } else if (field === "quantidadePontos" || field === "incremento") {
      // Aceita apenas números
      const numbers = value.replace(/\D/g, "")
      setFormData((prev) => ({ ...prev, [field]: numbers }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar código antes de submeter
    const codigoError = validateCodigo(formData.codigo)
    if (codigoError) {
      setErrors((prev) => ({ ...prev, codigo: codigoError }))
      toast.error("Código inválido", {
        description: codigoError,
        duration: 3000,
      })
      return
    }

    // Iniciar loading
    setIsLoading(true)
  }

  const handleClearForm = () => {
    setFormData(initialFormData)
    setIncrementoEnabled(false)
    setAnestesistaEnabled(false)
    setCalculationResult(null)
    setErrors({})
    toast.success("Formulário limpo", {
      description: "Todos os campos foram resetados",
      duration: 2000,
    })
  }

  const handleLoadingComplete = () => {
    // Calcular os honorários médicos
    const result = calculateMedicalFees({
      ...formData,
      anestesistaEnabled,
    })

    // Atualizar o estado com o resultado
    setCalculationResult(result)

    // Salvar no histórico (localStorage)
    saveCalculationToHistory(result)

    // Atualizar histórico local
    setHistory(getCalculationHistory())

    // Finalizar loading
    setIsLoading(false)

    toast.success("Cálculo realizado", {
      description: `Procedimento ${result.codigo} calculado com sucesso`,
      duration: 3000,
    })
  }

  const handleHistoryChange = () => {
    setHistory(getCalculationHistory())
  }

  if (showHistory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setShowHistory(false)}>
            <Calculator className="h-4 w-4 mr-2" />
            Voltar à Calculadora
          </Button>
          <h1 className="text-2xl font-bold">Histórico de Cálculos</h1>
          <div></div>
        </div>
        <HistoryList history={history} onHistoryChange={handleHistoryChange} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <LoadingOverlay isVisible={isLoading} onComplete={handleLoadingComplete} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator />
              Cálculo de Procedimentos Hospitalares
            </div>
            <p className="text-sm text-muted-foreground">v1.0.0</p>
          </CardTitle>
          <CardDescription>
            Preencha os campos abaixo para calcular os valores do Serviço Profissional e Hospitalar da AIH
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="codigo">Código</Label>
                <Input
                  id="codigo"
                  type="tel"
                  placeholder="00.00.00.000-0"
                  value={formData.codigo}
                  onChange={(e) => handleInputChange("codigo", e.target.value)}
                  required
                  className={errors.codigo ? "border-red-500" : ""}
                />
                {errors.codigo && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.codigo}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantidadePontos">Quantidade de Pontos</Label>
                <Input
                  id="quantidadePontos"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Digite a quantidade de pontos"
                  value={formData.quantidadePontos}
                  onChange={(e) => handleInputChange("quantidadePontos", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valorSP">Valor SP</Label>
                <Input
                  id="valorSP"
                  type="tel"
                  inputMode="numeric"
                  placeholder="R$ 0,00"
                  value={formData.valorSP}
                  onChange={(e) => handleInputChange("valorSP", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valorSH">Valor SH</Label>
                <Input
                  id="valorSH"
                  type="tel"
                  inputMode="numeric"
                  placeholder="R$ 0,00"
                  value={formData.valorSH}
                  onChange={(e) => handleInputChange("valorSH", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valorTSP">Valor TSP</Label>
                <Input
                  id="valorTSP"
                  type="tel"
                  inputMode="numeric"
                  placeholder="R$ 0,00"
                  value={formData.valorTSP}
                  onChange={(e) => handleInputChange("valorTSP", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="anestesista-switch"
                    className="cursor-pointer"
                    checked={anestesistaEnabled}
                    onCheckedChange={setAnestesistaEnabled}
                  />
                  <Label htmlFor="anestesista-switch">Inclui Valor da Anestesia</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="incremento-switch"
                    className="cursor-pointer"
                    checked={incrementoEnabled}
                    onCheckedChange={setIncrementoEnabled}
                  />
                  <Label htmlFor="incremento-switch">Incremento</Label>
                </div>
              </div>

              {incrementoEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="incremento">Valor do Incremento (%)</Label>
                  <Input
                    id="incremento"
                    type="text"
                    inputMode="numeric"
                    placeholder="Digite o valor do incremento"
                    value={formData.incremento}
                    onChange={(e) => handleInputChange("incremento", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantidadeAuxiliares">Quantidade de Auxiliares</Label>
              <Select
                value={formData.quantidadeAuxiliares}
                onValueChange={(value) => handleInputChange("quantidadeAuxiliares", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a quantidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" color="#050606" />0 Auxiliar
                    </div>
                  </SelectItem>
                  <SelectItem value="1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" color="#050606" />1 Auxiliar
                    </div>
                  </SelectItem>
                  <SelectItem value="2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" color="#050606" />2 Auxiliares
                    </div>
                  </SelectItem>
                  <SelectItem value="3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" color="#050606" />3 Auxiliares
                    </div>
                  </SelectItem>
                  <SelectItem value="4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" color="#050606" />4 Auxiliares
                    </div>
                  </SelectItem>
                  <SelectItem value="5">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" color="#050606" />5 Auxiliares
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 cursor-pointer w-60" disabled={isLoading}>
                {isLoading ? "Calculando..." : "Calcular"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer gap-2"
                onClick={handleClearForm}
                disabled={isLoading}
              >
                <RotateCcw className="h-4 w-4" />
                Limpar
              </Button>
              <Button type="button" variant="outline" className="cursor-pointer" onClick={() => setShowHistory(true)}>
                <History className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {calculationResult && <CalculationResult result={calculationResult} />}
    </div>
  )
}
