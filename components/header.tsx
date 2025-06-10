"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LogIn, Activity } from "lucide-react"

interface HeaderProps {
  onLogin: () => void
}

export function Header({ onLogin }: HeaderProps) {
  const [open, setOpen] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
    onLogin()
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">Dattra</span>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Acesso ao Sistema</h4>
                <p className="text-sm text-muted-foreground">Entre com suas credenciais para acessar o dashboard</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}
