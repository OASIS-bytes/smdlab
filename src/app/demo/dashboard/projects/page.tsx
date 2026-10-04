export default function ProjectsPage() {
  const projects = [
    { name: "Website Redesign", client: "Acme Co", status: "In Progress", progress: 65, deadline: "2026-11-15" },
    { name: "Mobile App", client: "Beta Inc", status: "Planning", progress: 20, deadline: "2026-12-01" },
    { name: "Brand Identity", client: "Gamma Ltd", status: "On Hold", progress: 45, deadline: "2026-11-30" },
    { name: "Dashboard UI", client: "Delta LLC", status: "Completed", progress: 100, deadline: "2026-10-20" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      case "On Hold":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="font-display text-3xl">Projects</h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search projects..."
            className="rounded-lg border border-ink/10 px-4 py-2 text-sm"
          />
          <select className="rounded-lg border border-ink/10 px-4 py-2 text-sm">
            <option>All Status</option>
            <option>In Progress</option>
            <option>Planning</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sand">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink/70">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink/70">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink/70">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink/70">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink/70">
                  Deadline
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {projects.map((project, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{project.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/70">{project.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-sand">
                        <div
                          className="h-2 rounded-full bg-copper-deep"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-ink/70">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/70">{project.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
