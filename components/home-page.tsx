import { Header } from "./header"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  DollarSign,
  Hospital,
  TrendingUp,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Zap,
  Target,
  PieChart,
  FileText,
  ArrowRight,
  Star,
} from "lucide-react"
import Image from 'next/image'


interface HomePageProps {
  onLogin: () => void
}

export function HomePage({ onLogin }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header onLogin={onLogin} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              🚀 Revolucione a gestão hospitalar
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Gestão de Receita
              <span className="block text-blue-600">Inteligente</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transforme a gestão financeira do seu hospital com nossa plataforma completa de controle de receitas,
              faturamento e análise de performance em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 cursor-pointer">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold cursor-pointer">
                Ver Demonstração
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">+30%</div>
                <div className="text-sm text-gray-600">Aumento na Eficiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">-50%</div>
                <div className="text-sm text-gray-600">Redução de Erros</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Suporte Disponível</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Recursos Principais
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tudo que você precisa em uma plataforma</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas poderosas para otimizar cada aspecto da gestão financeira hospitalar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl mb-2">Controle de Receitas</CardTitle>
                <CardDescription className="text-base">
                  Monitore todas as fontes de receita em tempo real com dashboards intuitivos e relatórios detalhados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl mb-2">Analytics Avançado</CardTitle>
                <CardDescription className="text-base">
                  Insights poderosos com visualizações interativas e métricas de performance em tempo real
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl mb-2">Automação Inteligente</CardTitle>
                <CardDescription className="text-base">
                  Automatize processos manuais e reduza erros com workflows inteligentes e validações automáticas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl mb-2">Gestão de Pacientes</CardTitle>
                <CardDescription className="text-base">
                  Sistema completo para cadastro, acompanhamento e histórico de pacientes e convênios
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center p-8">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl mb-2">Segurança Total</CardTitle>
                <CardDescription className="text-base">
                  Proteção de dados conforme LGPD com criptografia avançada e backups automáticos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center p-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl mb-2">Suporte 24/7</CardTitle>
                <CardDescription className="text-base">
                  Equipe especializada sempre disponível com treinamento completo e suporte técnico
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Por que escolher a Dattra?
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Resultados comprovados que transformam hospitais
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Aumento de 30% na eficiência operacional
                    </h3>
                    <p className="text-gray-600">Automatização de processos manuais e otimização de workflows</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">Redução de 50% em erros de faturamento</h3>
                    <p className="text-gray-600">Validação automática de dados e controles inteligentes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">Implementação em até 30 dias</h3>
                    <p className="text-gray-600">Setup rápido com migração de dados e treinamento inclusos</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">Suporte especializado contínuo</h3>
                    <p className="text-gray-600">Treinamento completo e acompanhamento dedicado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 text-center">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <PieChart className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">95%</div>
                    <div className="text-sm text-gray-600">Satisfação</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <FileText className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">1000+</div>
                    <div className="text-sm text-gray-600">Relatórios</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pronto para transformar seu hospital?</h3>
                <p className="text-gray-600 mb-6">
                  Junte-se a centenas de hospitais que já revolucionaram sua gestão financeira
                </p>
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
                  Agendar Demonstração Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Depoimentos
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">O que nossos clientes dizem</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardDescription className="text-base text-gray-700 mb-6">
                  "A Dattra revolucionou nossa gestão financeira. Conseguimos reduzir erros em 60% e aumentar nossa
                  eficiência operacional significativamente."
                </CardDescription>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Hospital className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Dr. Maria Silva</div>
                    <div className="text-sm text-gray-600">Diretora Financeira - Hospital São Lucas</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardDescription className="text-base text-gray-700 mb-6">
                  "Implementação rápida e suporte excepcional. Em 3 semanas já estávamos operando com total eficiência.
                  Recomendo fortemente!"
                </CardDescription>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Carlos Mendes</div>
                    <div className="text-sm text-gray-600">Administrador - Clínica Vida</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardDescription className="text-base text-gray-700 mb-6">
                  "Os relatórios e dashboards são incríveis. Agora temos visibilidade total sobre nossa performance
                  financeira em tempo real."
                </CardDescription>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Ana Costa</div>
                    <div className="text-sm text-gray-600">Gerente Financeira - Hospital Central</div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Comece sua transformação digital hoje</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de hospitais que já revolucionaram sua gestão financeira com a Dattra
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold cursor-pointer">
              Demonstração Gratuita
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer px-8 py-4 text-lg font-semibold text-black border-white hover:bg-white hover:text-blue-600"
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/dattra-icon.png" alt="Logo da Dattra" width={30} height={50} />
                <span className="text-2xl font-bold text-black">Dattra</span>
              </div>
              <p className="mb-4 text-black">
                Revolucionando a gestão hospitalar com tecnologia de ponta e suporte especializado.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-black">Produto</h3>
              <ul className="space-y-2 text-black">
                <li>Recursos</li>
                <li>Preços</li>
                <li>Demonstração</li>
                <li>Integrações</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-black">Empresa</h3>
              <ul className="space-y-2 text-black">
                <li>Sobre nós</li>
                <li>Carreiras</li>
                <li>Blog</li>
                <li>Contato</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-black">Suporte</h3>
              <ul className="space-y-2 text-black">
                <li>Central de Ajuda</li>
                <li>Documentação</li>
                <li>Treinamentos</li>
                <li>Status do Sistema</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-black">
            <p>© 2025 Dattra. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
