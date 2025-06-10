"use client"

import { AppSidebar } from "./app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { LogOut } from "lucide-react"

import { ReceitasPage } from "./pages/receitas-page"
import { FaturamentoPage } from "./pages/faturamento-page"
import { PacientesPage } from "./pages/pacientes-pages"
import { AgendamentosPage } from "./pages/agendamentos-pages"
import { RelatoriosPage } from "./pages/relatorios-page"

import { RevenueChart } from "./charts/revenue-chart"
import { BillingStatusChart } from "./charts/billing-status-chart"
import { DashboardStats } from "./dashboard-stats"
import { ConfiguracoesPage } from "./pages/configuracoes-page"
import { CalculadoraPage } from "./pages/calculadora-page"

interface DashboardProps {
  onLogout: () => void
  currentPage?: string
}

export function Dashboard({ onLogout, currentPage = "Dashboard" }: DashboardProps) {
  return (
    <SidebarProvider>
      <AppSidebar currentPage={currentPage} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{currentPage}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" onClick={onLogout} className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </Button>
          </div>
        </header>

        {currentPage === "Dashboard" && (
          <div className="flex flex-1 flex-col gap-4 p-4">
            <DashboardStats />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Receita Mensal</CardTitle>
                  <CardDescription>Evolução da receita baseada nos dados registrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Status dos Faturamentos</CardTitle>
                  <CardDescription>Distribuição por status dos faturamentos</CardDescription>
                </CardHeader>
                <CardContent>
                  <BillingStatusChart />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentPage !== "Dashboard" && (
          <div className="flex flex-1 flex-col gap-4 p-4">
            <PageContent pageName={currentPage} />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}

function PageContent({ pageName }: { pageName: string }) {
  switch (pageName) {
    case "Receitas":
      return <ReceitasPage />
    case "Faturamento":
      return <FaturamentoPage />
    case "Pacientes":
      return <PacientesPage />
    case "Agendamentos":
      return <AgendamentosPage />
    case "Relatórios":
      return <RelatoriosPage />
    case "Configurações":
      return <ConfiguracoesPage />
    case "Calculadora":
      return <CalculadoraPage />
    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle>{pageName}</CardTitle>
            <CardDescription>Página em desenvolvimento</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Esta funcionalidade está sendo desenvolvida.</p>
          </CardContent>
        </Card>
      )
  }
}
