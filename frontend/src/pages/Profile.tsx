export default function Profile() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-bold mb-6">Profile & Preferences</h2>
      
      <div className="space-y-6">
        {/* Personal Info */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="john@example.com"
              />
            </div>
          </div>
        </div>

        {/* Job Preferences */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Job Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Desired Role</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Remote / San Francisco"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Salary</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="100000"
              />
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Current Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {['JavaScript', 'React', 'Node.js', 'Python', 'PostgreSQL'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                {skill} ×
              </span>
            ))}
          </div>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Add new skill"
          />
        </div>

        {/* Gmail Integration */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Integrations</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Gmail Integration</p>
              <p className="text-sm text-gray-500">Automatically track application status from emails</p>
            </div>
            <button className="btn-primary">Connect Gmail</button>
          </div>
        </div>

        <button className="btn-primary w-full">Save Changes</button>
      </div>
    </div>
  )
}
