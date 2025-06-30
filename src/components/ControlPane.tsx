 'use client'

import { useState } from 'react'
import { AlertTriangle, DollarSign, Brain, Target } from 'lucide-react'
import { API_BASE_URL } from '@/lib/config'

 interface ControlPaneProps {
   lastInteraction?: { prompt: string; response: string }
   totalPrompts: number
   toxicityCount: number
   financeCount: number
   hallucinationCount?: number
 }

 interface EvalResult {
   toxicidade: number
   toxicidadeEvaluation: string
   conselho_financeiro: boolean
   conselhoFinanceiroEvaluation: string
  alucinacao: boolean
  alucinacaoEvaluation: string
  /** Avaliação de aderência ao tópico (1-3) */
  aderencia_topico: number
  aderenciaTopicoEvaluation: string
 }

 export default function ControlPane({
   lastInteraction,
   totalPrompts,
   toxicityCount,
   financeCount,
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   hallucinationCount,
 }: ControlPaneProps) {
   const [evalResult, setEvalResult] = useState<EvalResult | null>(null)
   const [loading, setLoading] = useState(false)

   const handleEvaluate = async () => {
     if (!lastInteraction) return
     setLoading(true)
     try {
       const res = await fetch(`${API_BASE_URL}/api/evaluate_response`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           prompt: lastInteraction.prompt,
           response: lastInteraction.response,
         }),
       })
       const data = await res.json()
      const { toxicity, financial_advice, hallucination, topic_adherence } = data.results
      setEvalResult({
        toxicidade: toxicity.decision,
        toxicidadeEvaluation: toxicity.evaluation,
        conselho_financeiro: financial_advice.decision === 'danger',
        conselhoFinanceiroEvaluation: financial_advice.evaluation,
        alucinacao: hallucination.decision === 'danger',
        alucinacaoEvaluation: hallucination.evaluation,
        aderencia_topico: topic_adherence.decision,
        aderenciaTopicoEvaluation: topic_adherence.evaluation,
      })
     } catch (err) {
       console.error('Failed to evaluate response:', err)
     } finally {
       setLoading(false)
     }
   }

   return (
     <div className="space-y-6">
       <div className="text-center space-y-4">
         <h3 className="text-lg font-semibold text-gray-800">
           Prompts filtrados
         </h3>
         <div className="flex justify-center space-x-12">
           <div className="flex flex-col items-center">
             <AlertTriangle className="h-8 w-8 text-yellow-500" />
             <span className="mt-2 text-3xl font-bold text-gray-900">
               {totalPrompts > 0
                 ? `${toxicityCount}/${totalPrompts}`
                 : toxicityCount}
             </span>
             <span className="text-sm text-gray-800">Toxicidade</span>
           </div>
           <div className="flex flex-col items-center">
             <DollarSign className="h-8 w-8 text-green-500" />
             <span className="mt-2 text-3xl font-bold text-gray-900">
               {totalPrompts > 0
                 ? `${financeCount}/${totalPrompts}`
                 : financeCount}
             </span>
             <span className="text-sm text-gray-800">Conselho Financeiro</span>
           </div>
         </div>
       </div>
       {lastInteraction && (
         <div className="p-4 border rounded-md bg-white">
           <h3 className="font-semibold mb-2 text-gray-800">Última Interação</h3>
           <p className="text-sm text-gray-700">
             <span className="font-medium">Prompt:</span> {lastInteraction.prompt}
           </p>
           <p className="text-sm text-gray-700 mt-1">
             <span className="font-medium">Resposta:</span>{' '}
             {lastInteraction.response}
           </p>
           <button
             onClick={handleEvaluate}
             disabled={loading}
             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
           >
             {loading ? 'Avaliando...' : 'Avaliar Resposta'}
           </button>
           {evalResult && (
             <div className="overflow-x-auto mt-4">
               <table className="table-auto w-full text-left min-w-max sm:min-w-full">
                 <colgroup>
                   <col className="w-8 sm:w-6" />
                   <col className="w-32 sm:w-auto" />
                   <col className="w-48 sm:w-full" />
                 </colgroup>
               <tbody>
                 <tr className="align-baseline">
                   <td>
                     <AlertTriangle className="h-4 w-4 text-yellow-500" />
                   </td>
                   <td className="pl-2 pr-2 sm:pr-4 font-medium text-gray-900 text-xs sm:text-sm">
                     Toxicidade: {evalResult.toxicidade}/5
                   </td>
                   <td className="text-xs sm:text-sm text-gray-700 break-words">
                     {evalResult.toxicidadeEvaluation}
                   </td>
                 </tr>
                 <tr className="align-baseline">
                   <td>
                     {evalResult.conselho_financeiro ? (
                       <DollarSign className="h-4 w-4 text-red-500" />
                     ) : (
                       <DollarSign className="h-4 w-4 text-green-500" />
                     )}
                   </td>
                   <td className="pl-2 pr-2 sm:pr-4 font-medium text-gray-900 text-xs sm:text-sm">
                     Conselho Financeiro:{' '}
                     {evalResult.conselho_financeiro ? 'Sim' : 'Não'}
                   </td>
                   <td className="text-xs sm:text-sm text-gray-700 break-words">
                     {evalResult.conselhoFinanceiroEvaluation}
                   </td>
                 </tr>
                <tr className="align-baseline">
                  <td>
                    {evalResult.alucinacao ? (
                      <Brain className="h-4 w-4 text-red-500" />
                    ) : (
                      <Brain className="h-4 w-4 text-green-500" />
                    )}
                  </td>
                  <td className="pl-2 pr-2 sm:pr-4 font-medium text-gray-900 text-xs sm:text-sm">
                    Alucinação: {evalResult.alucinacao ? 'Sim' : 'Não'}
                  </td>
                  <td className="text-xs sm:text-sm text-gray-700 break-words">
                    {evalResult.alucinacaoEvaluation}
                  </td>
                </tr>
                <tr className="align-baseline">
                  <td>
                    <Target className="h-4 w-4 text-blue-500" />
                  </td>
                  <td className="pl-2 pr-2 sm:pr-4 font-medium text-gray-900 text-xs sm:text-sm">
                    Aderência ao Tópico: {evalResult.aderencia_topico}/3
                  </td>
                  <td className="text-xs sm:text-sm text-gray-700 break-words">
                    {evalResult.aderenciaTopicoEvaluation}
                  </td>
                </tr>
               </tbody>
               </table>
             </div>
           )}
         </div>
       )}
     </div>
   )
 }