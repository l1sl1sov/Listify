import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  reopenTaskService,
  completeTaskService
} from '@/services/tasksApiService'
import { TaskInterface } from '@/types/task'

export const useToggleTaskStatus = () => {
  const queryClient = useQueryClient()

  const { mutate: toggleTaskStatus, isPending: isTogglingTaskStatus } =
    useMutation({
      mutationFn: async (task: TaskInterface) => {
        if (task.is_completed) {
          return await reopenTaskService(task.task_id)
        } else {
          return await completeTaskService(task.task_id)
        }
      },
      onMutate: async (updatedTask) => {
        await queryClient.cancelQueries({ queryKey: ['tasks'] })

        const previousTasks = queryClient.getQueryData<TaskInterface[]>([
          'tasks'
        ])

        queryClient.setQueryData<TaskInterface[]>(
          ['tasks'],
          (old) =>
            old?.map((task) =>
              task.task_id === updatedTask.task_id
                ? { ...task, completed: !updatedTask.is_completed }
                : task
            ) || []
        )

        return { previousTasks }
      },
      onError: (error, updatedTask, context) => {
        if (context?.previousTasks) {
          queryClient.setQueryData(['tasks'], context.previousTasks)
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
      }
    })

  return { toggleTaskStatus, isTogglingTaskStatus }
}
