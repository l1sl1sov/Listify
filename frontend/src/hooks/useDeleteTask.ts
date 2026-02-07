import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTaskService } from '../services/tasksApiService'
import { toastError } from '@/utils/task'
import { TaskInterface } from '@/types/task'

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  const { mutate: deleteTask, isPending: isDeletingTask } = useMutation({
    mutationFn: deleteTaskService,
    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const prevTasks = queryClient.getQueryData<TaskInterface[]>(['tasks'])
      queryClient.setQueryData(['tasks'], (old: TaskInterface[] = []) =>
        old.filter((task) => task.task_id !== taskId)
      )
      return { prevTasks }
    },
    onError: (error, taskId, context) => {
      queryClient.setQueryData(['tasks'], context?.prevTasks)
      toastError('Delete task')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  })

  return { deleteTask, isDeletingTask }
}
