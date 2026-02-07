export type Priority = 1 | 2 | 3

export type TaskId = string

export interface TaskInterface {
  task_id: TaskId
  task_icon: string
  title: string
  description?: string
  is_completed: boolean
  created_at: string
  updated_at: string
  completed_at: string | null
  priority: Priority
}

export type TaskView = Pick<
  TaskInterface,
  'title' | 'description' | 'is_completed' | 'priority' | 'task_icon'
>

export type TaskFormData = {
  title: string
  description?: string
  is_completed: boolean
  priority: Priority
  task_icon: string
}

export type TaskOrdering =
  | '-created_at'
  | 'created_at'
  | 'is_completed'
  | '-is_completed'
  | '-priority'
  | 'priority'

export type UpdateTaskPayload = {
  taskId: TaskId,
  newData: Partial<TaskView>
}