"use client"

import { useState } from "react"
import { Calendar, Plus, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function CapacityPlanning() {
  // State for sprint details
  const [sprintDetails, setSprintDetails] = useState({
    projectName: "Project Alpha",
    sprintName: "Sprint 5",
    sprintNumber: 5,
    startDate: "2025-04-01",
    endDate: "2025-04-14",
    workingHoursPerDay: 8,
    holidays: [{ date: "2025-04-07", description: "Company Holiday" }],
  })

  // State for tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Implement User Authentication",
      startDate: "2025-04-01",
      endDate: "2025-04-05",
      duration: 5,
      totalEffortHours: 40,
      development: 24,
      testing: 8,
      meeting: 4,
      taskSwitch: 4,
      assignedMembers: ["John Doe", "Jane Smith"],
      status: "In Progress",
    },
    {
      id: 2,
      name: "Design Dashboard UI",
      startDate: "2025-04-03",
      endDate: "2025-04-08",
      duration: 6,
      totalEffortHours: 32,
      development: 16,
      testing: 8,
      meeting: 4,
      taskSwitch: 4,
      assignedMembers: ["Alice Johnson"],
      status: "Not Started",
    },
    {
      id: 3,
      name: "API Integration",
      startDate: "2025-04-06",
      endDate: "2025-04-12",
      duration: 7,
      totalEffortHours: 56,
      development: 32,
      testing: 16,
      meeting: 4,
      taskSwitch: 4,
      assignedMembers: ["John Doe", "Bob Williams"],
      status: "Not Started",
    },
  ])

  // State for team members
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Developer",
      timeOff: 8,
      occupiedHours: 56,
      availableHours: 16,
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Tester",
      timeOff: 0,
      occupiedHours: 24,
      availableHours: 56,
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "Designer",
      timeOff: 16,
      occupiedHours: 32,
      availableHours: 32,
    },
    {
      id: 4,
      name: "Bob Williams",
      role: "Developer",
      timeOff: 0,
      occupiedHours: 32,
      availableHours: 48,
    },
  ])

  // State for editing task
  const [editingTask, setEditingTask] = useState(null)
  const [newTask, setNewTask] = useState({
    name: "",
    startDate: "",
    endDate: "",
    duration: 0,
    totalEffortHours: 0,
    development: 0,
    testing: 0,
    meeting: 0,
    taskSwitch: 0,
    assignedMembers: [],
    status: "Not Started",
  })

  // State for new holiday
  const [newHoliday, setNewHoliday] = useState({
    date: "",
    description: "",
  })

  // State for sprint status
  const [isSprintFrozen, setIsSprintFrozen] = useState(false)

  // Calculate duration between two dates
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  // Handle adding a new task
  const handleAddTask = () => {
    if (
      !newTask.name ||
      !newTask.startDate ||
      !newTask.endDate ||
      newTask.development + newTask.testing + newTask.meeting + newTask.taskSwitch === 0
    ) {
      alert("Please fill in all required fields")
      return
    }

    const duration = calculateDuration(newTask.startDate, newTask.endDate)
    const totalEffortHours =
      Number.parseInt(newTask.development) +
      Number.parseInt(newTask.testing) +
      Number.parseInt(newTask.meeting) +
      Number.parseInt(newTask.taskSwitch)

    const taskToAdd = {
      id: tasks.length + 1,
      ...newTask,
      duration,
      totalEffortHours,
    }

    setTasks([...tasks, taskToAdd])
    setNewTask({
      name: "",
      startDate: "",
      endDate: "",
      duration: 0,
      totalEffortHours: 0,
      development: 0,
      testing: 0,
      meeting: 0,
      taskSwitch: 0,
      assignedMembers: [],
      status: "Not Started",
    })
  }

  // Handle updating a task
  const handleUpdateTask = () => {
    if (!editingTask) return

    const updatedTasks = tasks.map((task) => (task.id === editingTask.id ? editingTask : task))

    setTasks(updatedTasks)
    setEditingTask(null)
  }

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
  }

  // Handle adding a holiday
  const handleAddHoliday = () => {
    if (!newHoliday.date || !newHoliday.description) {
      alert("Please fill in all holiday details")
      return
    }

    setSprintDetails({
      ...sprintDetails,
      holidays: [...sprintDetails.holidays, newHoliday],
    })

    setNewHoliday({
      date: "",
      description: "",
    })
  }

  // Handle completing and freezing the sprint
  const handleCompleteSprint = () => {
    setIsSprintFrozen(true)
  }

  // Handle creating a new sprint
  const handleCreateNewSprint = () => {
    const nextSprintNumber = sprintDetails.sprintNumber + 1

    // Calculate the next sprint dates (2 weeks from the end of the current sprint)
    const currentEndDate = new Date(sprintDetails.endDate)
    const newStartDate = new Date(currentEndDate)
    newStartDate.setDate(newStartDate.getDate() + 1)

    const newEndDate = new Date(newStartDate)
    newEndDate.setDate(newEndDate.getDate() + 13) // 2 weeks sprint

    setSprintDetails({
      ...sprintDetails,
      sprintName: `Sprint ${nextSprintNumber}`,
      sprintNumber: nextSprintNumber,
      startDate: newStartDate.toISOString().split("T")[0],
      endDate: newEndDate.toISOString().split("T")[0],
      holidays: [],
    })

    setTasks([])
    setIsSprintFrozen(false)
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Capacity Planning in Agile</h1>

      {/* Sprint Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Current Sprint Details</span>
            {isSprintFrozen ? (
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Sprint Completed</span>
            ) : (
              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">Sprint Active</span>
            )}
          </CardTitle>
          <CardDescription>Manage your sprint details, duration, and holidays</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={sprintDetails.projectName}
                onChange={(e) => setSprintDetails({ ...sprintDetails, projectName: e.target.value })}
                disabled={isSprintFrozen}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sprintName">Sprint Name</Label>
              <Input
                id="sprintName"
                value={sprintDetails.sprintName}
                onChange={(e) => setSprintDetails({ ...sprintDetails, sprintName: e.target.value })}
                disabled={isSprintFrozen}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sprintNumber">Sprint Number</Label>
              <Input
                id="sprintNumber"
                type="number"
                value={sprintDetails.sprintNumber}
                onChange={(e) =>
                  setSprintDetails({
                    ...sprintDetails,
                    sprintNumber: Number.parseInt(e.target.value),
                  })
                }
                disabled={isSprintFrozen}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <div className="relative">
                <Input
                  id="startDate"
                  type="date"
                  value={sprintDetails.startDate}
                  onChange={(e) => setSprintDetails({ ...sprintDetails, startDate: e.target.value })}
                  disabled={isSprintFrozen}
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <div className="relative">
                <Input
                  id="endDate"
                  type="date"
                  value={sprintDetails.endDate}
                  onChange={(e) => setSprintDetails({ ...sprintDetails, endDate: e.target.value })}
                  disabled={isSprintFrozen}
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="workingHours">Working Hours Per Day</Label>
              <Input
                id="workingHours"
                type="number"
                value={sprintDetails.workingHoursPerDay}
                onChange={(e) =>
                  setSprintDetails({
                    ...sprintDetails,
                    workingHoursPerDay: Number.parseInt(e.target.value),
                  })
                }
                disabled={isSprintFrozen}
              />
            </div>
          </div>

          {/* Holidays Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Team Holidays</h3>
              {!isSprintFrozen && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" /> Add Holiday
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Team Holiday</DialogTitle>
                      <DialogDescription>Add holidays that fall within the sprint duration</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="holidayDate">Date</Label>
                        <Input
                          id="holidayDate"
                          type="date"
                          value={newHoliday.date}
                          onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="holidayDescription">Description</Label>
                        <Input
                          id="holidayDescription"
                          placeholder="e.g., National Holiday"
                          value={newHoliday.description}
                          onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddHoliday}>Add Holiday</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sprintDetails.holidays.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground">
                        No holidays added
                      </TableCell>
                    </TableRow>
                  ) : (
                    sprintDetails.holidays.map((holiday, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatDate(holiday.date)}</TableCell>
                        <TableCell>{holiday.description}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Sprint Duration:{" "}
            <span className="font-medium">
              {calculateDuration(sprintDetails.startDate, sprintDetails.endDate)} days
            </span>
          </div>
          <div className="flex gap-2">
            {isSprintFrozen ? (
              <Button onClick={handleCreateNewSprint}>Create New Sprint</Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Complete Sprint & Freeze Planner</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will finalize the sprint and make all details read-only. You won't be able to make
                      changes after this.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCompleteSprint}>Complete Sprint</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Task Management Tabs */}
      <Tabs defaultValue="tasks">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tasks">Task Effort Hours</TabsTrigger>
          <TabsTrigger value="capacity">Team Member Capacity</TabsTrigger>
        </TabsList>

        {/* Task Effort Hours Tab */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Task Effort Hours</span>
                {!isSprintFrozen && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                        <DialogDescription>Add a new task and allocate effort hours</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="taskName">Task Name</Label>
                          <Input
                            id="taskName"
                            placeholder="Enter task name"
                            value={newTask.name}
                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taskStatus">Status</Label>
                          <Select
                            value={newTask.status}
                            onValueChange={(value) => setNewTask({ ...newTask, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Not Started">Not Started</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taskStartDate">Start Date</Label>
                          <Input
                            id="taskStartDate"
                            type="date"
                            value={newTask.startDate}
                            onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taskEndDate">End Date</Label>
                          <Input
                            id="taskEndDate"
                            type="date"
                            value={newTask.endDate}
                            onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taskDevelopment">Development Hours</Label>
                          <Input
                            id="taskDevelopment"
                            type="number"
                            value={newTask.development}
                            onChange={(e) =>
                              setNewTask({
                                ...newTask,
                                development: Number.parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taskTesting">Testing Hours</Label>
                          <Input
                            id="taskTesting"
                            type="number"
                            value={newTask.testing}
                            onChange={(e) =>
                              setNewTask({
                                ...newTask,
                                testing: Number.parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taskMeeting">Meeting Hours</Label>
                          <Input
                            id="taskMeeting"
                            type="number"
                            value={newTask.meeting}
                            onChange={(e) =>
                              setNewTask({
                                ...newTask,
                                meeting: Number.parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taskSwitch">Task Switch Hours</Label>
                          <Input
                            id="taskSwitch"
                            type="number"
                            value={newTask.taskSwitch}
                            onChange={(e) =>
                              setNewTask({
                                ...newTask,
                                taskSwitch: Number.parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="assignedMembers">Assigned Team Members</Label>
                          <Select
                            value={newTask.assignedMembers[0] || ""}
                            onValueChange={(value) =>
                              setNewTask({
                                ...newTask,
                                assignedMembers: [value],
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select team member" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamMembers.map((member) => (
                                <SelectItem key={member.id} value={member.name}>
                                  {member.name} ({member.role})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddTask}>Add Task</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardTitle>
              <CardDescription>Manage tasks and allocate effort hours for the sprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task Name</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Dev</TableHead>
                      <TableHead>Test</TableHead>
                      <TableHead>Meeting</TableHead>
                      <TableHead>Switch</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Status</TableHead>
                      {!isSprintFrozen && <TableHead>Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={isSprintFrozen ? 9 : 10} className="text-center text-muted-foreground">
                          No tasks added
                        </TableCell>
                      </TableRow>
                    ) : (
                      tasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.name}</TableCell>
                          <TableCell>
                            {task.duration} days
                            <div className="text-xs text-muted-foreground">
                              {formatDate(task.startDate)} - {formatDate(task.endDate)}
                            </div>
                          </TableCell>
                          <TableCell>{task.development}</TableCell>
                          <TableCell>{task.testing}</TableCell>
                          <TableCell>{task.meeting}</TableCell>
                          <TableCell>{task.taskSwitch}</TableCell>
                          <TableCell className="font-medium">{task.totalEffortHours}</TableCell>
                          <TableCell>
                            {task.assignedMembers.map((member, idx) => (
                              <div key={idx}>{member}</div>
                            ))}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                task.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : task.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {task.status}
                            </span>
                          </TableCell>
                          {!isSprintFrozen && (
                            <TableCell>
                              <div className="flex space-x-1">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => setEditingTask({ ...task })}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl">
                                    <DialogHeader>
                                      <DialogTitle>Edit Task</DialogTitle>
                                    </DialogHeader>
                                    {editingTask && (
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="editTaskName">Task Name</Label>
                                          <Input
                                            id="editTaskName"
                                            value={editingTask.name}
                                            onChange={(e) =>
                                              setEditingTask({
                                                ...editingTask,
                                                name: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="editTaskStatus">Status</Label>
                                          <Select
                                            value={editingTask.status}
                                            onValueChange={(value) =>
                                              setEditingTask({
                                                ...editingTask,
                                                status: value,
                                              })
                                            }
                                          >
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Not Started">Not Started</SelectItem>
                                              <SelectItem value="In Progress">In Progress</SelectItem>
                                              <SelectItem value="Completed">Completed</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="editTaskStartDate">Start Date</Label>
                                          <Input
                                            id="editTaskStartDate"
                                            type="date"
                                            value={editingTask.startDate}
                                            onChange={(e) =>
                                              setEditingTask({
                                                ...editingTask,
                                                startDate: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="editTaskEndDate">End Date</Label>
                                          <Input
                                            id="editTaskEndDate"
                                            type="date"
                                            value={editingTask.endDate}
                                            onChange={(e) =>
                                              setEditingTask({
                                                ...editingTask,
                                                endDate: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="editTaskDevelopment">Development Hours</Label>
                                          <Input
                                            id="editTaskDevelopment"
                                            type="number"
                                            value={editingTask.development}
                                            onChange={(e) =>
                                              setEditingTask({
                                                ...editingTask,
                                                development: Number.parseInt(e.target.value) || 0,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="editTaskTesting">Testing Hours</Label>
                                          <Input
                                            id="editTaskTesting"
                                            type="number"
                                            value={editingTask.testing}
                                            onChange={(e) =>
                                              setEditingTask({
                                                ...editingTask,
                                                testing: Number.parseInt(e.target.value) || 0,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="editTaskMeeting">Meeting Hours</Label>
                                          <Input
                                            id="editTaskMeeting"
                                            type="number"
                                            value={editingTask.meeting}
                                            onChange={(e) =>
                                              setEditingTask({
                                                ...editingTask,
                                                meeting: Number.parseInt(e.target.value) || 0,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="editTaskSwitch">Task Switch Hours</Label>
                                          <Input
                                            id="editTaskSwitch"
                                            type="number"
                                            value={editingTask.taskSwitch}
                                            onChange={(e) =>
                                              setEditingTask({
                                                ...editingTask,
                                                taskSwitch: Number.parseInt(e.target.value) || 0,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                          <Label htmlFor="editAssignedMembers">Assigned Team Members</Label>
                                          <Select
                                            value={editingTask.assignedMembers[0] || ""}
                                            onValueChange={(value) =>
                                              setEditingTask({
                                                ...editingTask,
                                                assignedMembers: [value],
                                              })
                                            }
                                          >
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {teamMembers.map((member) => (
                                                <SelectItem key={member.id} value={member.name}>
                                                  {member.name} ({member.role})
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                    )}
                                    <DialogFooter>
                                      <Button onClick={handleUpdateTask}>Update Task</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Task</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this task? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteTask(task.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Member Capacity Tab */}
        <TabsContent value="capacity">
          <Card>
            <CardHeader>
              <CardTitle>Team Member Capacity</CardTitle>
              <CardDescription>Track team member capacity and workload for the sprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Time Off (Hours)</TableHead>
                      <TableHead>Occupied Hours</TableHead>
                      <TableHead>Available Hours</TableHead>
                      <TableHead>Capacity %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => {
                      const totalWorkingHours =
                        calculateDuration(sprintDetails.startDate, sprintDetails.endDate) *
                          sprintDetails.workingHoursPerDay -
                        member.timeOff
                      const capacityPercentage = Math.round((member.occupiedHours / totalWorkingHours) * 100)

                      return (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.role}</TableCell>
                          <TableCell>{member.timeOff}</TableCell>
                          <TableCell>{member.occupiedHours}</TableCell>
                          <TableCell>{member.availableHours}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className={`h-2.5 rounded-full ${
                                    capacityPercentage > 90
                                      ? "bg-red-600"
                                      : capacityPercentage > 70
                                        ? "bg-yellow-400"
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: `${capacityPercentage}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">{capacityPercentage}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Total Sprint Capacity:{" "}
                <span className="font-medium">
                  {teamMembers.reduce((sum, member) => sum + member.occupiedHours, 0)} hours
                </span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

