'use client'

import { useState, useEffect } from 'react'
import { Plus, RefreshCw, Play, Calendar, Tag, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface TestQuestion {
  id: number
  query: string
  expected_risk: string
  category: string
  description: string
  date_added: string
}

interface BatchTestResult {
  question_id: number
  query: string
  expected_risk: string
  category: string
  assessment: string
  dimensions: {
    [key: string]: string
  }
  match_found: boolean
}

interface BatchTestResponse {
  results: BatchTestResult[]
  total_questions: number
  matches_found: number
  accuracy_percentage: number
}

export default function TestMode() {
  const [questions, setQuestions] = useState<TestQuestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [batchResults, setBatchResults] = useState<BatchTestResponse | null>(null)
  const [isBatchTesting, setIsBatchTesting] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedResults, setExpandedResults] = useState<Set<number>>(new Set())

  // Form state
  const [newQuestion, setNewQuestion] = useState({
    query: '',
    expected_risk: 'Safe',
    category: '',
    description: ''
  })

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/evaluation/questions')
      if (response.ok) {
        const data = await response.json()
        setQuestions(data)
      }
    } catch (err) {
      setError('Failed to load questions')
    } finally {
      setIsLoading(false)
    }
  }

  const addQuestion = async () => {
    if (!newQuestion.query.trim() || !newQuestion.category.trim() || !newQuestion.description.trim()) {
      setError('Please fill in all fields')
      return
    }

    try {
      const response = await fetch('http://localhost:8000/api/evaluation/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setNewQuestion({
            query: '',
            expected_risk: 'Safe',
            category: '',
            description: ''
          })
          setShowAddForm(false)
          loadQuestions()
        } else {
          setError(data.message)
        }
      } else {
        const errorData = await response.json()
        setError(errorData.detail || 'Failed to add question')
      }
    } catch (err) {
      setError('Failed to add question')
    }
  }

  const runBatchTest = async () => {
    setIsBatchTesting(true)
    setError(null)
    setBatchResults(null)

    try {
      console.log('Starting batch test...')
      const response = await fetch('http://localhost:8000/api/evaluation/batch-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Batch test results:', data)
        setBatchResults(data)
      } else {
        const errorText = await response.text()
        console.error('Batch test error:', errorText)
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          throw new Error(`HTTP ${response.status}: ${errorText}`)
        }
        setError(errorData.detail || 'Failed to run batch test')
      }
    } catch (err) {
      console.error('Batch test error:', err)
      setError(err instanceof Error ? err.message : 'Failed to run batch test')
    } finally {
      setIsBatchTesting(false)
    }
  }

  const getRiskColor = (risk: string) => {
    const lower = risk.toLowerCase()
    if (lower === 'safe') return 'bg-green-100 text-green-800'
    if (lower === 'caution') return 'bg-yellow-100 text-yellow-800'
    if (lower.includes('moderate')) return 'bg-orange-100 text-orange-800'
    if (lower.includes('high') || lower.includes('dangerous')) return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  const toggleExpandResult = (resultId: number) => {
    const newExpanded = new Set(expandedResults)
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId)
    } else {
      newExpanded.add(resultId)
    }
    setExpandedResults(newExpanded)
  }

  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = []
    }
    acc[question.category].push(question)
    return acc
  }, {} as Record<string, TestQuestion[]>)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Batch Testing & Question Management</h2>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={loadQuestions}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Questions
          </button>
          
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Question
          </button>
          
          <button
            onClick={runBatchTest}
            disabled={isBatchTesting || questions.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            {isBatchTesting ? 'Running Test...' : 'Run Batch Test'}
          </button>
        </div>

        {/* Add Question Form */}
        {showAddForm && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">Add New Test Question</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Query</label>
                <textarea
                  value={newQuestion.query}
                  onChange={(e) => setNewQuestion({...newQuestion, query: e.target.value})}
                  placeholder="Enter the test query..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Risk Level</label>
                  <select
                    value={newQuestion.expected_risk}
                    onChange={(e) => setNewQuestion({...newQuestion, expected_risk: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Safe">Safe</option>
                    <option value="Caution">Caution</option>
                    <option value="Moderate Risk">Moderate Risk</option>
                    <option value="High Risk">High Risk</option>
                    <option value="Dangerous">Dangerous</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                    placeholder="e.g., Educational, Cybercrime, etc."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newQuestion.description}
                  onChange={(e) => setNewQuestion({...newQuestion, description: e.target.value})}
                  placeholder="Brief description of what this tests..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={addQuestion}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Add Question
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Questions Display */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Questions Database</h3>
        
        {questions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No test questions available</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
              <div key={category}>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {category}
                </h4>
                <div className="space-y-3">
                  {categoryQuestions.map((question) => (
                    <div key={question.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">ID: {question.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(question.expected_risk)}`}>
                            {question.expected_risk}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {question.date_added}
                        </div>
                      </div>
                      <p className="font-medium text-gray-900 mb-2">{question.query}</p>
                      <p className="text-sm text-gray-600">{question.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-sm text-gray-500 text-center">
              Total Questions: {questions.length}
            </div>
          </div>
        )}
      </div>

      {/* Batch Test Results */}
      {batchResults && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Test Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{batchResults.total_questions}</div>
              <div className="text-sm text-blue-800">Total Questions</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{batchResults.matches_found}</div>
              <div className="text-sm text-green-800">Matches Found</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">{batchResults.total_questions - batchResults.matches_found}</div>
              <div className="text-sm text-red-800">Mismatches</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">{batchResults.accuracy_percentage}%</div>
              <div className="text-sm text-purple-800">Accuracy Rate</div>
            </div>
          </div>
          
                     <div className="bg-gray-50 rounded-lg p-4 mb-6">
             <div className="flex justify-between items-start mb-2">
               <h4 className="font-medium text-gray-900">Test Summary</h4>
               <div className="flex gap-2">
                 <button
                   onClick={() => setExpandedResults(new Set(batchResults.results.map(r => r.question_id)))}
                   className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                 >
                   Expand All
                 </button>
                 <button
                   onClick={() => setExpandedResults(new Set())}
                   className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                 >
                   Collapse All
                 </button>
               </div>
             </div>
             <p className="text-sm text-gray-700">
               Evaluated {batchResults.total_questions} test questions across multiple risk categories. 
               The system correctly identified the expected risk level in {batchResults.matches_found} cases, 
               achieving an accuracy rate of {batchResults.accuracy_percentage}%.
               {batchResults.accuracy_percentage < 50 && (
                 <span className="text-amber-600 font-medium"> Consider reviewing the agent configuration or test questions.</span>
               )}
             </p>
           </div>

                     <div className="space-y-4">
             {batchResults.results.map((result, index) => (
               <div key={result.question_id} className="border rounded-lg p-4">
                 <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2">
                     <button
                       onClick={() => toggleExpandResult(result.question_id)}
                       className="text-gray-400 hover:text-gray-600"
                     >
                       {expandedResults.has(result.question_id) ? '▼' : '▶'}
                     </button>
                     <span className="font-medium">Test {index + 1}</span>
                     <span className="text-sm text-gray-500">({result.category})</span>
                     {result.match_found ? (
                       <CheckCircle className="h-5 w-5 text-green-500" />
                     ) : (
                       <XCircle className="h-5 w-5 text-red-500" />
                     )}
                   </div>
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(result.expected_risk)}`}>
                     Expected: {result.expected_risk}
                   </span>
                 </div>
                 
                 <p className="font-medium mb-3">{result.query}</p>
                 
                 {expandedResults.has(result.question_id) && (
                   <>
                     {/* Risk Analysis Section */}
                     {result.dimensions && Object.keys(result.dimensions).length > 0 && (
                       <div className="mb-4">
                         <h4 className="font-medium text-gray-900 mb-2">Risk Analysis:</h4>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                           {result.dimensions.toxicity && result.dimensions.toxicity !== 'Unknown' && (
                             <div className="flex justify-between">
                               <span className="text-gray-600">Toxicity:</span>
                               <span className="font-medium">{result.dimensions.toxicity}</span>
                             </div>
                           )}
                           {result.dimensions.violence && result.dimensions.violence !== 'Unknown' && (
                             <div className="flex justify-between">
                               <span className="text-gray-600">Violence:</span>
                               <span className="font-medium">{result.dimensions.violence}</span>
                             </div>
                           )}
                           {result.dimensions.illegal_activities && result.dimensions.illegal_activities !== 'Unknown' && (
                             <div className="flex justify-between">
                               <span className="text-gray-600">Illegal:</span>
                               <span className="font-medium">{result.dimensions.illegal_activities}</span>
                             </div>
                           )}
                           {result.dimensions.misinformation && result.dimensions.misinformation !== 'Unknown' && (
                             <div className="flex justify-between">
                               <span className="text-gray-600">Misinformation:</span>
                               <span className="font-medium">{result.dimensions.misinformation}</span>
                             </div>
                           )}
                           {result.dimensions.privacy_violations && result.dimensions.privacy_violations !== 'Unknown' && (
                             <div className="flex justify-between">
                               <span className="text-gray-600">Privacy:</span>
                               <span className="font-medium">{result.dimensions.privacy_violations}</span>
                             </div>
                           )}
                         </div>
                         
                         {result.dimensions.overall_harm && result.dimensions.overall_harm !== 'Unknown' && (
                           <div className="mt-3 pt-2 border-t">
                             <div className="flex justify-between items-center">
                               <span className="font-medium text-gray-900">Overall Harm:</span>
                               <span className={`px-2 py-1 rounded text-sm font-medium ${getRiskColor(result.dimensions.overall_harm)}`}>
                                 {result.dimensions.overall_harm}
                               </span>
                             </div>
                             {result.dimensions.recommendation && result.dimensions.recommendation !== 'Unknown' && (
                               <div className="flex justify-between items-center mt-1">
                                 <span className="font-medium text-gray-900">Recommendation:</span>
                                 <span className={`font-medium ${
                                   result.dimensions.recommendation.toLowerCase().includes('allow') ? 'text-green-600' :
                                   result.dimensions.recommendation.toLowerCase().includes('block') ? 'text-red-600' :
                                   'text-orange-600'
                                 }`}>
                                   {result.dimensions.recommendation}
                                 </span>
                               </div>
                             )}
                           </div>
                         )}
                       </div>
                     )}
                     
                     {/* Full Assessment */}
                     <div className="mb-3">
                       <h4 className="font-medium text-gray-900 mb-2">Agent Response:</h4>
                       <div className="bg-gray-50 rounded p-3 max-h-48 overflow-y-auto">
                         <pre className="text-sm text-gray-700 whitespace-pre-wrap">{result.assessment}</pre>
                       </div>
                     </div>
                   </>
                 )}
                 
                 {/* Match Result */}
                 <div className="flex items-center justify-between pt-2 border-t">
                   <div className="text-sm">
                     {result.match_found ? (
                       <span className="text-green-600 font-medium">✅ Expected Risk Found in Response</span>
                     ) : (
                       <span className="text-red-600 font-medium">❌ Expected Risk Not Found in Response</span>
                     )}
                   </div>
                   <div className="text-xs text-gray-500">
                     ID: {result.question_id}
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}
    </div>
  )
} 