import { useState } from 'react'

export default function StudyArea() {
  const [message, setMessage] = useState('')

  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-bold mb-6">Study Area</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Topics List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Study Topics</h3>
            <div className="space-y-2">
              {['Kubernetes', 'Docker', 'AWS Lambda'].map((topic) => (
                <button
                  key={topic}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <p className="font-medium">{topic}</p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">60% Complete</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Study Content & Chatbot */}
        <div className="lg:col-span-2 space-y-6">
          {/* Study Material */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Kubernetes - Container Orchestration</h3>
            <div className="prose max-w-none">
              <h4 className="text-md font-semibold mt-4">Interview Questions:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>What is Kubernetes and why is it used?</li>
                <li>Explain the architecture of Kubernetes</li>
                <li>What are Pods, Services, and Deployments?</li>
              </ul>
              
              <h4 className="text-md font-semibold mt-4">Key Concepts:</h4>
              <p className="text-sm text-gray-700">
                Kubernetes is an open-source container orchestration platform that automates
                the deployment, scaling, and management of containerized applications...
              </p>
            </div>
            <button className="btn-primary mt-4">Mark as Mastered</button>
          </div>

          {/* AI Chatbot */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Study Assistant Chatbot</h3>
            
            {/* Chat History */}
            <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-primary-600 text-white rounded-lg px-4 py-2 max-w-xs">
                    What is a Kubernetes Pod?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 max-w-xs">
                    A Pod is the smallest deployable unit in Kubernetes. It represents a single
                    instance of a running process and can contain one or more containers...
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a question about this topic..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
