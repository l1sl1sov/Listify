import styles from './TaskForm.module.scss'

import { FormEvent } from 'react'
import { useCallback, useState } from 'react'
import { TaskFormData } from '../../types/task'
import { Priority } from '../../types/task'

import { toast } from 'react-toastify'
import SelectTaskIcon from '../SelectTaskIcon/SelectTaskIcon'

interface UpdateTaskFormProps {
  onSubmit: (data: TaskFormData) => void
  isPending: boolean
  initialData?: Partial<TaskFormData>
}

const UpdateTaskForm = ({ onSubmit, initialData, isPending }: UpdateTaskFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [isCompleted, setIsCompleted] = useState(
    initialData?.is_completed || false
  )
  const [priority, setPriority] = useState<Priority>(initialData?.priority || 2)
  const [icon, setIcon] = useState(initialData?.task_icon || 'note')

  const clearData = () => {
    setTitle('')
    setDescription('')
    setIsCompleted(false)
    setPriority(2)
    setIcon('note')
  }

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      if (!title.trim()) {
        toast.error(`Field 'title' is required`)
        return
      }
      if (title.length > 128 || (description && description.length > 500)) {
        toast.error(`Field 'title' or 'description' is too long`)
        return
      }
      try {
        await onSubmit({
          title: title,
          description: description,
          is_completed: isCompleted,
          priority: priority,
          task_icon: icon
        })
        toast.success('Task is updated')
      } catch (error) {
        console.error('Handling submit error:', error)
        toast.error('Server error')
      }
    },
    [onSubmit, title, description, isCompleted, priority, icon]
  )

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        placeholder="Task name"
        onChange={(event) => setTitle(event.target.value)}
        className={styles.title}
      />
      <textarea
        value={description}
        placeholder="Task description"
        onChange={(event) => setDescription(event.target.value)}
        className={styles.description}
      />
      <div className={styles.options}>
        <div className={styles.completeness}>
          <label className={styles.option}>
            <input
              type="radio"
              name="isCompleted"
              value="completed"
              checked={isCompleted === true}
              onChange={() => setIsCompleted(true)}
            />
            Completed
          </label>
          <label className={styles.option}>
            <input
              type="radio"
              name="isCompleted"
              value="uncompleted"
              checked={isCompleted === false}
              onChange={() => setIsCompleted(false)}
            />
            Uncompleted
          </label>
        </div>
        <div className={styles.priority}>
          Priority:{' '}
          <select
            value={priority}
            onChange={(event) =>
              setPriority(Number(event.target.value) as 1 | 2 | 3)
            }
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
        <SelectTaskIcon setIcon={setIcon} />
      </div>
      <button
        type="button"
        className="bg-gray-400 max-w-[6rem]"
        onClick={clearData}
      >
        Clear form
      </button>
      <button
        type="submit"
        disabled={isPending}
        className="bg-main-light max-w-[10rem]"
      >
        Edit task
      </button>
    </form>
  )
}

export default UpdateTaskForm