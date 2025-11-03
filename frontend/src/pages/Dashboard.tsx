export default function Dashboard() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700">Active Applications</h3>
          <p className="text-3xl font-bold text-primary-600 mt-2">12</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700">New Matches</h3>
          <p className="text-3xl font-bold text-primary-600 mt-2">8</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700">Study Topics</h3>
          <p className="text-3xl font-bold text-primary-600 mt-2">5</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">New job matches found</p>
            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Application status updated</p>
            <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}
