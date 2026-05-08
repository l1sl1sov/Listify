import { deleteBulkService } from '@/services/tasksApiService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toastError } from '@/utils/task'

export const useDeleteBulkTasks = () => {
  const queryClient = useQueryClient()

  const { mutate: deleteBulkTasks, isPending: isDeletingBulkTasks } = useMutation(
    {
      mutationFn: deleteBulkService,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
      onError: () => toastError('Deleting bulk tasks onError')
    }
  )

  return { deleteBulkTasks, isDeletingBulkTasks }
}
