import { toast } from 'react-toastify'

export const validateNewTask = () => {}

export const toastError = (error: string) => {
  toast.error(`${error} error, please try later`)
}
