'use client'

import { useState, useEffect } from 'react'
import { Shield, Info, AlertTriangle, CheckCircle, XCircle, MessageCircle, Activity } from 'lucide-react'
import * as Tabs from '@radix-ui/react-tabs'
import Image from 'next/image'
// import InteractiveEvaluation from './InteractiveEvaluation'
// import TestMode from './TestMode'
import About from './About'
import ConversationalMode from './ConversationalMode'
import ControlPane from './ControlPane'
import { API_BASE_URL } from '@/lib/config'

interface ServiceStatus {
  status: string
  message: string
  timestamp: string
}

export default function RAIDemoApp() {
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus | null>(null)
  // Contadores por tipo de filtro de input (danger flags) y total de prompts
  const [totalPrompts, setTotalPrompts] = useState(0)
  const [toxicityCount, setToxicityCount] = useState(0)
  const [financeCount, setFinanceCount] = useState(0)
  const [hallucinationCount, setHallucinationCount] = useState(0)
  const [lastInteraction, setLastInteraction] = useState<{ prompt: string; response: string } | null>(null)

  useEffect(() => {
    // Check service status on component mount
    checkServiceStatus()
  }, [])

  const checkServiceStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/evaluation/status`, {
        credentials: 'include',
      })
      if (response.ok) {
        const status = await response.json()
        setServiceStatus(status)
      }
    } catch (error) {
      console.error('Failed to check service status:', error)
      setServiceStatus({
        status: 'error',
        message: 'Failed to connect to backend service',
        timestamp: new Date().toISOString()
      })
    }
  }

  const getStatusIcon = () => {
    if (!serviceStatus) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    
    switch (serviceStatus.status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'unhealthy':
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = () => {
    if (!serviceStatus) return 'text-yellow-600'
    
    switch (serviceStatus.status) {
      case 'healthy':
        return 'text-green-600'
      case 'unhealthy':
      case 'error':
        return 'text-red-600'
      default:
        return 'text-yellow-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Demo: Assistente Bancário
                </h1>
                <p className="text-gray-600 mt-1">
                  Guardrails em agentes
                </p>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              {getStatusIcon()}
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {serviceStatus?.status || 'checking...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs.Root defaultValue="conversational" className="w-full">
          <Tabs.List className="flex p-1 bg-white rounded-lg shadow-sm border mb-8">
            <Tabs.Trigger
              value="conversational"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 text-gray-600 hover:text-gray-900 flex-1 justify-center"
            >
              <MessageCircle className="h-4 w-4" />
              Chat Agent
            </Tabs.Trigger>
            <Tabs.Trigger
              value="control"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700 text-gray-600 hover:text-gray-900 flex-1 justify-center"
            >
              <Activity className="h-4 w-4" />
              Live Monitoring
            </Tabs.Trigger>
            <Tabs.Trigger
              value="about"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 text-gray-600 hover:text-gray-900 flex-1 justify-center"
            >
              <Info className="h-4 w-4" />
              About
            </Tabs.Trigger>
          </Tabs.List>

        <Tabs.Content value="conversational" forceMount className="mt-4 data-[state=inactive]:hidden">
          <ConversationalMode
              onInteraction={(decision, evaluation, prompt, response) => {
                setTotalPrompts(tp => tp + 1)
                // Contar danger flags por tipo según evaluación del input filter
                const ev = evaluation?.toLowerCase() || ''
                if (ev.includes('toxic')) {
                  setToxicityCount(c => c + (decision === 'danger' ? 1 : 0))
                }
                if (ev.includes('finance')) {
                  setFinanceCount(c => c + (decision === 'danger' ? 1 : 0))
                }
                if (ev.includes('halluc')) {
                  setHallucinationCount(c => c + (decision === 'danger' ? 1 : 0))
                }
                setLastInteraction({ prompt, response })
              }}
            />
        </Tabs.Content>

        <Tabs.Content value="control" forceMount className="mt-4 data-[state=inactive]:hidden">
          <ControlPane
            lastInteraction={lastInteraction || undefined}
            totalPrompts={totalPrompts}
            toxicityCount={toxicityCount}
            financeCount={financeCount}
            hallucinationCount={hallucinationCount}
          />
        </Tabs.Content>

        <Tabs.Content value="about" className="mt-4 data-[state=inactive]:hidden">
          <About />
        </Tabs.Content>
        </Tabs.Root>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <Image src="/acc_logo.png" alt="Company Logo" width={64} height={66} className="mx-auto mb-4 h-16" />
            <p className="text-base text-gray-600">
              Responsible AI Latam Team
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 