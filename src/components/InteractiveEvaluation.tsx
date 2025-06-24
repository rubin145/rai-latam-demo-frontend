'use client'

import { useState } from 'react'
import { Search, AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface QueryEvaluationResponse {
  assessment: string
  dimensions: {
    toxicity: string
    violence: string
    illegal_activities: string
    misinformation: string
    privacy_violations: string
    overall_harm: string
    recommendation: string
    clean_response: string
    full_response: string
  }
  clean_response: string
  full_response: string
}

export default function InteractiveEvaluation() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<QueryEvaluationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const evaluateQuery = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('http://localhost:8000/api/evaluation/query', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to evaluate query')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      evaluateQuery()
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    const lower = recommendation.toLowerCase()
    if (lower.includes('allow') || lower.includes('safe')) return 'text-green-600'
    if (lower.includes('block') || lower.includes('deny') || lower.includes('dangerous')) return 'text-red-600'
    if (lower.includes('review') || lower.includes('caution') || lower.includes('moderate')) return 'text-orange-600'
    return 'text-gray-600'
  }

  const getRecommendationIcon = (recommendation: string) => {
    const lower = recommendation.toLowerCase()
    if (lower.includes('allow') || lower.includes('safe')) return <CheckCircle className="h-5 w-5 text-green-500" />
    if (lower.includes('block') || lower.includes('deny') || lower.includes('dangerous')) return <XCircle className="h-5 w-5 text-red-500" />
    if (lower.includes('review') || lower.includes('caution') || lower.includes('moderate')) return <AlertTriangle className="h-5 w-5 text-orange-500" />
    return <AlertCircle className="h-5 w-5 text-gray-500" />
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Real-time Query Evaluation</h2>
        <p className="text-gray-600 mb-6">
          Enter any query to get a comprehensive harm assessment with risk analysis across multiple dimensions.
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="query" className="block text-sm font-medium text-black mb-2">
                Enter Query to Evaluate
              </label>
              <textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your question or statement here..."
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black placeholder-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Press Ctrl + Enter to evaluate</p>
            </div>

            <div className="flex flex-col justify-end">
              <button
                onClick={evaluateQuery}
                disabled={!query.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2 h-fit"
              >
                <Search className="h-4 w-4" />
                {isLoading ? 'Evaluating...' : 'Evaluate Query'}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Assessment Dimensions:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Violence & Harm Risk</strong></li>
              <li>• <strong>Illegal Activity Risk</strong></li>
              <li>• <strong>Misinformation Risk</strong></li>
              <li>• <strong>Privacy Violation Risk</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Results */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <h3 className="font-medium text-red-900">Error</h3>
          </div>
          <p className="text-red-800 mt-1">{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* Risk Analysis */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Violence:</span>
                  <span className="font-medium">{result.dimensions.violence}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Illegal activities:</span>
                  <span className="font-medium">{result.dimensions.illegal_activities}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Misinformation:</span>
                  <span className="font-medium">{result.dimensions.misinformation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Privacy violations:</span>
                  <span className="font-medium">{result.dimensions.privacy_violations}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Overall Harm Scoring:</span>
                <span className="font-semibold text-lg">{result.dimensions.overall_harm}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Recommendation:</span>
                <div className="flex items-center gap-2">
                  {getRecommendationIcon(result.dimensions.recommendation)}
                  <span className={`font-semibold ${getRecommendationColor(result.dimensions.recommendation)}`}>
                    {result.dimensions.recommendation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Assessment */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Full Assessment</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                {result.assessment}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 