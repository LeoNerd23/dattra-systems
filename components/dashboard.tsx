"use client"

import { AppSidebar } from "./app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { LogOut, Building2 } from "lucide-react"

import { ReceitasPage } from "./pages/receitas-page"
import { FaturamentoPage } from "./pages/faturamento-page"
import { PacientesPage } from "./pages/pacientes-pages"
import { AgendamentosPage } from "./pages/agendamentos-pages"
import { RelatoriosPage } from "./pages/relatorios-page"
import { ConfiguracoesPage } from "./pages/configuracoes-pages"

import { RevenueChart } from "./charts/revenue-chart"
import { BillingStatusChart } from "./charts/billing-status-chart"
import { DashboardStats } from "./dashboard-stats"
import { useHospital } from "@/contexts/hospital-context"

interface DashboardProps {
  onLogout: () => void
  currentPage?: string
}

export function Dashboard({ onLogout, currentPage = "Dashboard" }: DashboardProps) {
  const { hospitalAtual } = useHospital()

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
                <BreadcrumbPage className="flex items-center gap-2">
                  {hospitalAtual && (
                    <>
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-muted-foreground">{hospitalAtual.nome}</span>
                      <Separator orientation="vertical" className="h-4" />
                    </>
                  )}
                  {currentPage}
                </BreadcrumbPage>
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
            {hospitalAtual && (
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{hospitalAtual.nome}</CardTitle>
                      <CardDescription className="text-sm">
                        CNPJ: {hospitalAtual.cnpj} • {hospitalAtual.endereco}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )}

            <DashboardStats />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Receita Mensal</CardTitle>
                  <CardDescription>
                    Evolução da receita baseada nos dados registrados
                    {hospitalAtual && ` - ${hospitalAtual.nome}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Status dos Faturamentos</CardTitle>
                  <CardDescription>
                    Distribuição por status dos faturamentos
                    {hospitalAtual && ` - ${hospitalAtual.nome}`}
                  </CardDescription>
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
