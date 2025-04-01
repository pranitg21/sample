"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TicketManagement() {
  // Dummy data for the table
  const tickets = [
    {
      id: "TICK-001",
      title: "Fix login page bug",
      priority: "High",
      points: 5,
      assignee: "John Doe",
      reporter: "Jane Smith",
      status: "In Progress",
    },
    {
      id: "TICK-002",
      title: "Implement new dashboard features",
      priority: "Medium",
      points: 8,
      assignee: "Alice Johnson",
      reporter: "Bob Williams",
      status: "To Do",
    },
    {
      id: "TICK-003",
      title: "Update user documentation",
      priority: "Low",
      points: 3,
      assignee: "Emily Davis",
      reporter: "Michael Brown",
      status: "Done",
    },
    {
      id: "TICK-004",
      title: "Optimize database queries",
      priority: "High",
      points: 13,
      assignee: "David Wilson",
      reporter: "Sarah Miller",
      status: "In Progress",
    },
    {
      id: "TICK-005",
      title: "Add export to PDF functionality",
      priority: "Medium",
      points: 8,
      assignee: "John Doe",
      reporter: "Jane Smith",
      status: "To Do",
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bug">Bug</SelectItem>
              <SelectItem value="feature">Feature</SelectItem>
              <SelectItem value="task">Task</SelectItem>
              <SelectItem value="story">Story</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="inprogress">In Progress</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="PQL" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tickets..."
            className="w-full md:w-[250px] pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : ticket.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </TableCell>
                <TableCell>{ticket.points}</TableCell>
                <TableCell>{ticket.assignee}</TableCell>
                <TableCell>{ticket.reporter}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : ticket.status === "To Do"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

