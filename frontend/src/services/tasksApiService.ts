import axios from "axios";
import { TASKS_API } from "../constants/api";
import { TaskOrdering, AddTaskData, TaskInterface } from "../types/task";
import { TaskId } from "../types/task";

export const fetchTasksService = async (ordering: TaskOrdering) => {
  const response = await axios.get<TaskInterface[]>(`${TASKS_API}?ordering=${ordering}`);
  return response.data;
};

export const addTaskService = (data: AddTaskData) => {
  return axios.post(TASKS_API, data);
};

export const completeTaskService = (taskId: TaskId) => {
  return axios.patch(`${TASKS_API}${taskId}/complete/`);
}

export const reopenTaskService = (taskId: TaskId) => {
  return axios.patch(`${TASKS_API}${taskId}/reopen/`);
}

export const deleteTaskService = (taskId: TaskId) => {
  return axios.delete(`${TASKS_API}${taskId}/`);
};

export const deleteBulkService = (tasksToDelete: string[]) => {
  return axios.delete(`${TASKS_API}bulk-delete/`, {
    data: { ids: tasksToDelete },
  });
};

export const deleteAllTasksService = () => {
  return axios.delete(TASKS_API);
};
