export default function JobSearch() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-bold mb-6">Job Search</h2>
      
      {/* Filters */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Role (e.g., Software Engineer)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="text"
            placeholder="Location"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="number"
            placeholder="Min Salary"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button className="btn-primary mt-4">Apply Filters</button>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Senior Software Engineer</h3>
                <p className="text-gray-600 mt-1">Tech Company Inc. • Remote</p>
                <div className="mt-3 flex items-center space-x-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    90% Match
                  </span>
                  <span className="text-sm text-gray-500">Posted 2 days ago</span>
                </div>
                
                {/* Skills */}
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700">Matched Skills:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">TypeScript</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Node.js</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mt-2">Skill Gaps:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded hover:bg-yellow-200">
                      Kubernetes +
                    </button>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex flex-col space-y-2">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  View Job
                </a>
                <button className="btn-secondary text-sm">
                  Track Application
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
