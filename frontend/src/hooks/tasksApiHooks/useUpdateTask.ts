import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { updateTaskService } from '@/services/tasksApiService'
import { UpdateTaskPayload } from '@/types/task'
import { TaskInterface } from '@/types/task'

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  const { mutate: updateTask, isPending: isUpdatingTask } = useMutation({
    mutationFn: async ({ taskId, newData }: UpdateTaskPayload) => {
      return await updateTaskService({ taskId, newData })
    },
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const previousTasks = queryClient.getQueryData<TaskInterface[]>(['tasks'])
      queryClient.setQueryData<TaskInterface[]>(
        ['tasks'],
        (old) =>
          old?.map((task) =>
            task.task_id === updatedTask.taskId
              ? { ...task, ...updatedTask.newData }
              : task
          ) || []
      )

      return { previousTasks }
    },
    onError: (_, updatedTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })

  return { updateTask, isUpdatingTask }
}
