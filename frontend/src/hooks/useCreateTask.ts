import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTaskService } from '../services/tasksApiService'
import { toastError } from '../utils/task'

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  const { mutate: createTask, isPending: isCreatingTask } = useMutation({
    mutationFn: addTaskService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    onError: () => toastError('Creating task')
  })

  return { createTask, isCreatingTask }
}
