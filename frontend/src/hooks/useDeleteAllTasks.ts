import { deleteAllTasksService } from '@/services/tasksApiService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toastError } from '@/utils/task'

export const useDeleteAllTasks = () => {
  const queryClient = useQueryClient()

  const { mutate: deleteAllTasks, isPending: isDeletingAllTasks } = useMutation(
    {
      mutationFn: deleteAllTasksService,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
      onError: () => toastError('Deleting all tasks onError')
    }
  )

  return { deleteAllTasks, isDeletingAllTasks }
}
