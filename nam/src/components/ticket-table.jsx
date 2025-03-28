// Dummy data
const tickets = [
    {
      id: "PROJ-1",
      title: "Implement user authentication",
      priority: "High",
      points: 8,
      assignee: "Jane Smith",
      reporter: "John Doe",
      status: "In Progress",
    },
    {
      id: "PROJ-2",
      title: "Fix navigation bar on mobile",
      priority: "Medium",
      points: 3,
      assignee: "Mike Johnson",
      reporter: "Sarah Williams",
      status: "Review",
    },
    {
      id: "PROJ-3",
      title: "Add dark mode support",
      priority: "Low",
      points: 5,
      assignee: "Emily Davis",
      reporter: "John Doe",
      status: "Open",
    },
    {
      id: "PROJ-4",
      title: "Optimize database queries",
      priority: "Critical",
      points: 13,
      assignee: "Jane Smith",
      reporter: "Mike Johnson",
      status: "In Progress",
    },
    {
      id: "PROJ-5",
      title: "Update documentation",
      priority: "Low",
      points: 2,
      assignee: "John Doe",
      reporter: "Emily Davis",
      status: "Done",
    },
    {
      id: "PROJ-6",
      title: "Fix payment processing bug",
      priority: "Critical",
      points: 8,
      assignee: "Mike Johnson",
      reporter: "Jane Smith",
      status: "Open",
    },
    {
      id: "PROJ-7",
      title: "Implement file upload feature",
      priority: "Medium",
      points: 5,
      assignee: "Sarah Williams",
      reporter: "John Doe",
      status: "In Progress",
    },
    {
      id: "PROJ-8",
      title: "Refactor authentication service",
      priority: "High",
      points: 8,
      assignee: "Emily Davis",
      reporter: "Mike Johnson",
      status: "Review",
    },
  ]
  
  // Helper function to get the appropriate color for priority badges
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-blue-100 text-blue-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };
  
  // Helper function to get the appropriate color for status badges
  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Review":
        return "bg-purple-100 text-purple-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  }
  
  function TicketTableJSX() {
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">Project Tickets</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reporter
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td className={getStatusColor(ticket.status)}>{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td className={getPriorityColor(ticket.priority)}>{ticket.priority}</td>
                  <td className="text-center">{ticket.points}</td>
                  <td>{ticket.assignee}</td>
                  <td>{ticket.reporter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default TicketTableJSX;