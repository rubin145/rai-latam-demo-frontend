'use client'

import { useState } from 'react'
import { Bot, User, CornerDownLeft, Circle, CheckCircle } from 'lucide-react'

// Define the structure of a chat message
interface Message {
  sender: 'user' | 'bot'
  text: string
}

export default function ConversationalMode() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hello! I'm ready to chat. Ask me anything." }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [useGuardrails, setUseGuardrails] = useState(true)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Determine the endpoint based on the guardrails toggle
    const endpoint = useGuardrails
      ? 'http://localhost:8000/api/evaluation/chat-guardrails'
      : 'http://localhost:8000/api/evaluation/chat'

    try {
      // API call to the backend
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // NOTE: A real implementation would need to send conversation history
        body: JSON.stringify({ query: input }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const botMessage: Message = { sender: 'bot', text: data.response }
      setMessages(prev => [...prev, botMessage])

    } catch (error) {
      console.error('Failed to get response:', error)
      const errorMessage: Message = {
        sender: 'bot',
        text: "Sorry, I couldn't get a response. Please check the backend connection."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Conversational Mode</h2>
        <button
          onClick={() => setUseGuardrails(!useGuardrails)}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
            useGuardrails
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {useGuardrails ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
          Guardrails: {useGuardrails ? 'ON' : 'OFF'}
        </button>
      </div>
      
      {/* Chat History */}
      <div className="h-96 overflow-y-auto pr-4 space-y-6 mb-4 border rounded-lg p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && (
              <div className="bg-gray-200 p-2 rounded-full">
                <Bot className="h-6 w-6 text-gray-600" />
              </div>
            )}
            <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
            {msg.sender === 'user' && (
              <div className="bg-blue-500 p-2 rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="bg-gray-200 p-2 rounded-full">
              <Bot className="h-6 w-6 text-gray-600" />
            </div>
            <div className="max-w-md p-3 rounded-lg bg-white text-gray-800 border border-gray-200 rounded-bl-none">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="relative">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
          className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <CornerDownLeft className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
} 