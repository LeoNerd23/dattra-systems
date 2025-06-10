import { Header } from "./header"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, DollarSign, Hospital, TrendingUp, Shield, Users, Clock, CheckCircle } from "lucide-react"

interface HomePageProps {
  onLogin: () => void
}

export function HomePage({ onLogin }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header onLogin={onLogin} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sistema de Gerenciamento de
            <span className="text-blue-600"> Receita Hospitalar</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Otimize a gestão financeira do seu hospital com nossa plataforma completa de controle de receitas,
            faturamento e análise de performance.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="px-8">
              Solicitar Demo
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recursos Principais</h2>
          <p className="text-lg text-gray-600">Tudo que você precisa para gerenciar a receita do seu hospital</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <DollarSign className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Controle de Receitas</CardTitle>
              <CardDescription>Monitore todas as fontes de receita em tempo real</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Relatórios Avançados</CardTitle>
              <CardDescription>Dashboards intuitivos com métricas detalhadas</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Hospital className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Gestão Hospitalar</CardTitle>
              <CardDescription>Integração completa com sistemas hospitalares</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Análise Preditiva</CardTitle>
              <CardDescription>Previsões inteligentes para otimizar resultados</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-red-600 mb-2" />
              <CardTitle>Segurança Total</CardTitle>
              <CardDescription>Proteção de dados conforme LGPD e padrões internacionais</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>Suporte 24/7</CardTitle>
              <CardDescription>Equipe especializada sempre disponível</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Por que escolher a Dattra?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Aumento de 30% na eficiência</h3>
                    <p className="text-gray-600">Automatização de processos manuais</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Redução de 50% em erros</h3>
                    <p className="text-gray-600">Validação automática de dados</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Implementação rápida</h3>
                    <p className="text-gray-600">Sistema operacional em até 30 dias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Suporte contínuo</h3>
                    <p className="text-gray-600">Treinamento e acompanhamento especializado</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pronto para começar?</h3>
                <p className="text-gray-600 mb-6">
                  Agende uma demonstração gratuita e veja como podemos transformar a gestão financeira do seu hospital.
                </p>
                <Button size="lg" className="w-full">
                  Agendar Demonstração
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Hospital className="h-6 w-6" />
            <span className="text-xl font-bold">Dattra</span>
          </div>
          <p className="text-gray-400">© 2024 Dattra. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
