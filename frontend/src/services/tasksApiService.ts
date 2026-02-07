import axios from 'axios'
import { TASKS_API } from '../constants/api'
import { TaskOrdering, TaskView, TaskInterface } from '../types/task'
import { TaskId } from '../types/task'
import { UpdateTaskPayload } from '../types/task'

export const fetchTasksService = async (ordering: TaskOrdering) => {
  const response = await axios.get<TaskInterface[]>(
    `${TASKS_API}?ordering=${ordering}`
  )
  return response.data
}

export const addTaskService = async (data: TaskView) => {
  const response = await axios.post(TASKS_API, data)
  return response.data
}

export const completeTaskService = async (taskId: TaskId) => {
  const response = await axios.patch(`${TASKS_API}${taskId}/complete/`)
  return response.data
}

export const reopenTaskService = async (taskId: TaskId) => {
  const response = await axios.patch(`${TASKS_API}${taskId}/reopen/`)
  return response.data
}

export const deleteTaskService = async (taskId: TaskId) => {
  await axios.delete(`${TASKS_API}${taskId}/`)
}

export const updateTaskService = async ({newData, taskId}: UpdateTaskPayload) => {
  const response = await axios.patch(`${TASKS_API}${taskId}/`, newData)
  return response.data
}

export const deleteBulkService = async (tasksToDelete: string[]) => {
  await axios.delete(`${TASKS_API}bulk-delete/`, {
    data: { ids: tasksToDelete }
  })
}

export const deleteAllTasksService = async () => {
  await axios.delete(TASKS_API)
}
