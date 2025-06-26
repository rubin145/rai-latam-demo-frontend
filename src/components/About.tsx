'use client'

import { Shield, Flame, DollarSign, Settings } from 'lucide-react'

export default function About() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Demo: Assistente Bancário</h2>
            <p className="text-gray-600">Guardrails em agentes</p>
          </div>
        </div>

        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Visão Geral</h3>
          <p className="text-gray-700 mb-6">
            Esta demo ilustra a importância de implementar mecanismos de segurança e avaliação em agentes baseados em LLMs, a necessidade de monitorar comportamentos inesperados, e definir políticas claras de comportamento esperado.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Políticas definidas</h4>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li>Política de toxicidade</li>
                <li>Política de não aconselhamento financeiro</li>
                <li>Política de restrição de escopo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Guardrails</h4>
              <ul className="text-sm text-gray-700 list-none space-y-2">
                <li className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-red-500" /> Filtro de entrada: toxicity_filter
                </li>
                <li className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" /> Filtro de entrada: financial_advice_filter
                </li>
                <li className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-500" /> Instrução de sistema
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Avaliação</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 font-bold text-gray-900">Métrica</th>
                <th className="text-left py-3 font-bold text-gray-900">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 font-medium text-gray-900">Toxicidade</td>
                <td className="py-3 text-gray-600">Nível de linguagem tóxica ou ofensiva</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Aconselhamento financeiro</td>
                <td className="py-3 text-gray-600">Risco de fornecer orientação financeira inadequada</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Alucinação</td>
                <td className="py-3 text-gray-600">Presença de informações falsas ou inventadas</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Aderência ao tópico</td>
                <td className="py-3 text-gray-600">Avalia o alinhamento da resposta com o tópico solicitado (1-3)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dimensões de Risco</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 font-bold text-gray-900">Dimensão</th>
                <th className="text-left py-3 font-bold text-gray-900">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 font-medium text-gray-900">Nível de Toxicidade</td>
                <td className="py-3 text-gray-600">Linguagem tóxica, ofensiva ou prejudicial</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Risco de Violência e Dano</td>
                <td className="py-3 text-gray-600">Potencial para promover violência ou dano</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Risco de Atividade Ilegal</td>
                <td className="py-3 text-gray-600">Solicitações de assistência ilegal</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Risco de Desinformação</td>
                <td className="py-3 text-gray-600">Propagação de informações falsas ou perigosas</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Risco de Violação de Privacidade</td>
                <td className="py-3 text-gray-600">Solicitações de informações pessoais</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Risco de Conformidade</td>
                <td className="py-3 text-gray-600">Dar aconselhamento financeiro de maneira inadequada</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="bg-white rounded-lg shadow-sm border p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Níveis de Risco</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium text-gray-900">Seguro</div>
                <div className="text-sm text-gray-600">Nenhum conteúdo prejudicial detectado</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="font-medium text-gray-900">Atenção</div>
                <div className="text-sm text-gray-600">Preocupações menores ou casos limites</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <div className="font-medium text-gray-900">Risco Moderado</div>
                <div className="text-sm text-gray-600">Intenção prejudicial clara mas escopo limitado</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <div className="font-medium text-gray-900">Alto Risco</div>
                <div className="text-sm text-gray-600">Potencial significativo de dano</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <div className="font-medium text-gray-900">Perigoso</div>
                <div className="text-sm text-gray-600">Ameaça imediata e severa</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendações</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium text-gray-900">Permitir</div>
                <div className="text-sm text-gray-600">Seguro para prosseguir sem restrições</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="font-medium text-gray-900">Permitir com Aviso</div>
                <div className="text-sm text-gray-600">Prosseguir com notificação ao usuário</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <div className="font-medium text-gray-900">Requer Revisão</div>
                <div className="text-sm text-gray-600">Revisão humana recomendada</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <div className="font-medium text-gray-900">Bloquear</div>
                <div className="text-sm text-gray-600">Deve ser bloqueado automaticamente</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <div className="font-medium text-gray-900">Bloqueio Imediato</div>
                <div className="text-sm text-gray-600">Requer intervenção imediata</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Experimente</h3>
          <div className="flex justify-center">
            <img 
              src="/rai_latam_demo_qr_.png" 
              alt="QR Code para experimentar o demo" 
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>
      </div>

    </div>
  )
} 