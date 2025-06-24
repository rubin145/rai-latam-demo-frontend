'use client'

import { Shield, Search, TestTube, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

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
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
          <p className="text-gray-700 mb-6">
            This application provides comprehensive evaluation of user queries for potentially harmful content 
            using the Accenture AI Refinery SDK. It combines advanced AI analysis with structured risk assessment 
            to help organizations implement effective content moderation.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start gap-3">
              <Search className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Interactive Evaluation</h4>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  <li>• Real-time harm assessment of any query</li>
                  <li>• Multi-dimensional risk analysis</li>
                  <li>• Detailed reasoning for each assessment</li>
                  <li>• Actionable recommendations</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TestTube className="h-6 w-6 text-green-500 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Test Mode</h4>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  <li>• Comprehensive test question database</li>
                  <li>• Batch testing capabilities</li>
                  <li>• Add custom test questions</li>
                  <li>• Track assessment accuracy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Dimensions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 font-medium text-gray-900">Dimension</th>
                <th className="text-left py-3 font-medium text-gray-900">Weight</th>
                <th className="text-left py-3 font-medium text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 font-medium text-gray-900">Toxicity Level</td>
                <td className="py-3 text-gray-600">30%</td>
                <td className="py-3 text-gray-600">Toxic, offensive, or harmful language</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Violence & Harm Risk</td>
                <td className="py-3 text-gray-600">25%</td>
                <td className="py-3 text-gray-600">Potential for promoting violence or harm</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Illegal Activity Risk</td>
                <td className="py-3 text-gray-600">20%</td>
                <td className="py-3 text-gray-600">Requests for illegal assistance</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Misinformation Risk</td>
                <td className="py-3 text-gray-600">15%</td>
                <td className="py-3 text-gray-600">Spreading false or dangerous information</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-900">Privacy Violation Risk</td>
                <td className="py-3 text-gray-600">10%</td>
                <td className="py-3 text-gray-600">Personal information requests</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Levels</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium text-gray-900">Safe</div>
                <div className="text-sm text-gray-600">No harmful content detected</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="font-medium text-gray-900">Caution</div>
                <div className="text-sm text-gray-600">Minor concerns or edge cases</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <div className="font-medium text-gray-900">Moderate Risk</div>
                <div className="text-sm text-gray-600">Clear harmful intent but limited scope</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <div className="font-medium text-gray-900">High Risk</div>
                <div className="text-sm text-gray-600">Significant potential for harm</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <div className="font-medium text-gray-900">Dangerous</div>
                <div className="text-sm text-gray-600">Immediate and severe threat</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium text-gray-900">Allow</div>
                <div className="text-sm text-gray-600">Safe to proceed without restrictions</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="font-medium text-gray-900">Allow with Warning</div>
                <div className="text-sm text-gray-600">Proceed with user notification</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <div className="font-medium text-gray-900">Require Review</div>
                <div className="text-sm text-gray-600">Human review recommended</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <div className="font-medium text-gray-900">Block</div>
                <div className="text-sm text-gray-600">Should be blocked automatically</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <div className="font-medium text-gray-900">Immediate Block</div>
                <div className="text-sm text-gray-600">Requires immediate intervention</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-600 mt-1" />
          <div>
            <h3 className="font-medium text-amber-900 mb-2">Important Notice</h3>
            <p className="text-amber-800 text-sm">
              This tool assists with content moderation but should not be the sole safety mechanism. 
              Always implement multiple layers of safety checks and human oversight for critical applications.
              The AI Refinery SDK provides advanced capabilities, but human judgment remains essential 
              for nuanced content decisions.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Architecture</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Frontend</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Next.js 14 with TypeScript</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Radix UI components</li>
              <li>• Real-time API integration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Backend</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• FastAPI with Python</li>
              <li>• AI Refinery SDK integration</li>
              <li>• RESTful API design</li>
              <li>• OpenAPI documentation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border rounded-lg p-6 text-center">
        <img src="/logo.png" alt="Company Logo" className="mx-auto mb-4 h-8" />
        <p className="text-sm text-gray-600">
          Responsible AI Latam Team
        </p>
      </div>
    </div>
  )
} 