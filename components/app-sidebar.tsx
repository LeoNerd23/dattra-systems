"use client"

import {
  BarChart3,
  DollarSign,
  FileText,
  Home,
  Hospital,
  Settings,
  Users,
  TrendingUp,
  Calculator,
  Calendar,
  CreditCard,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Image from 'next/image'

interface AppSidebarProps {
  currentPage?: string
}

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "#dashboard",
  },
  {
    title: "Receitas",
    icon: DollarSign,
    url: "#receitas",
  },
  {
    title: "Faturamento",
    icon: CreditCard,
    url: "#faturamento",
  },
  {
    title: "Relatórios",
    icon: BarChart3,
    url: "#relatorios",
  },
  {
    title: "Pacientes",
    icon: Users,
    url: "#pacientes",
  },
  {
    title: "Agendamentos",
    icon: Calendar,
    url: "#agendamentos",
  },
]

const analyticsItems = [
  {
    title: "Calculadora",
    icon: Calculator,
    url: "#calculadora",
  },
]

export function AppSidebar({ currentPage = "Dashboard" }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center space-x-2">
          <Image src="/dattra-icon.png" alt="Logo da Dattra" width={30} height={50} />
          <span className="text-lg font-bold">Dattra</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={currentPage === item.title}>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Serviços</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={currentPage === item.title}>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#configuracoes" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
