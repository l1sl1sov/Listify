import styles from './TaskItem.module.scss'
import React, { useState } from 'react'

import { toast } from 'react-toastify'
import deleteTaskIcon from '../../assets/icons/deletetask-icon.png'
import completeTaskIcon from '../../assets/icons/completetask-icon.png'
import reopenTaskIcon from '../../assets/icons/reopentask-icon.png'
import editTaskIcon from '../../assets/icons/edittask-icon.png'
import { MdOutlineStarOutline } from 'react-icons/md'
import { MdOutlineStarPurple500 } from 'react-icons/md'
import { TaskInterface } from '../../types/task'

import { Modal } from '../modals/Modal'
import UpdateTaskForm from '../forms/UpdateTaskForm'
import { TaskId } from '../../types/task'
import { Dispatch, SetStateAction } from 'react'

import { useDeleteTask } from '@/hooks/useDeleteTask'
import { useToggleTaskStatus } from '@/hooks/useToggleTaskStatus'
import { useUpdateTask } from '@/hooks/useUpdateTask'

type TaskProps = {
  task: TaskInterface
  selectParams: {
    isSelectingMode: boolean
    selectedTasks: TaskId[]
    setSelectedTasks: Dispatch<SetStateAction<Array<TaskId>>>
  }
}

const Task = ({ task, selectParams }: TaskProps) => {
  const { deleteTask, isDeletingTask } = useDeleteTask()
  const { toggleTaskStatus, isTogglingTaskStatus } = useToggleTaskStatus()
  const { updateTask, isUpdatingTask } = useUpdateTask()

  const [isUpdatingModal, setIsUpdatingModal] = useState(false)
  const { isSelectingMode, selectedTasks, setSelectedTasks } = selectParams

  const copyTaskId = () => {
    navigator.clipboard.writeText(task.task_id)
    toast.success('Task id is copied', {
      autoClose: 3000
    })
  }

  const handleTaskSelect = (taskId: TaskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    )
  }

  return (
      <li className={styles.task} key={task.task_id}>
        <div className="flex flex-row gap-2 items-center">
          {isSelectingMode && (
            <div className="inline-block">
              <label className="block">
                <input
                  type="checkbox"
                  className="hidden peer"
                  onChange={() => handleTaskSelect(task.task_id)}
                  checked={selectedTasks.includes(task.task_id)}
                />
                <div
                  className="inline-block w-[1.5rem] h-[1.5rem] border-2 rounded-full 
                     cursor-pointer transition-colors duration-300 ease-in-out
                     peer-checked:border-main-1 hover:border-main-light"
                ></div>
              </label>
            </div>
          )}

          <div className="flex flex-col gap-1 [&>*]:text-main-color2">
            {Array.apply(null, Array(3)).map((_, i) =>
              i + 1 <= task.priority ? (
                <MdOutlineStarPurple500 key={i} />
              ) : (
                <MdOutlineStarOutline key={i} />
              )
            )}
          </div>
          <div
            className={`${styles['task-info']} ${task.is_completed ? styles['task-completed'] : ''}`}
          >
            <div className={styles.icon}>
              <img src={`/images/task-icons/${task.task_icon}.png`}></img>
            </div>
            <div className={styles.texts}>
              <div
                className="cursor-pointer flex items-center border-solid border-2 self-start divide-x-2"
                onClick={copyTaskId}
              >
                <span>{task.task_id}</span>
                <img src="/images/task-icons/copy.svg"></img>
              </div>
              <span className={styles['task-title']}>{task.title}</span>
              {task.description && <span>{task.description}</span>}
            </div>
          </div>
        </div>
        <div className={styles.forms}>
          <button
            title="Delete task"
            onClick={() => deleteTask(task.task_id)}
            disabled={isDeletingTask}
          >
            <img src={deleteTaskIcon} alt="delete task" />
          </button>
          <button
            title={task.is_completed ? 'Reopen task' : 'Complete task'}
            disabled={isTogglingTaskStatus}
            onClick={() => toggleTaskStatus(task)}
          >
            {task.is_completed ? (
              <img
                src={reopenTaskIcon}
                alt="reopen task"
                style={{
                  transform: 'scale(1.25)'
                }}
              ></img>
            ) : (
              <img src={completeTaskIcon} alt="complete task"></img>
            )}
          </button>
          <button title="Edit task" onClick={() => setIsUpdatingModal(true)}>
            <img src={editTaskIcon} alt="edit task" />
          </button>
        </div>
        <Modal
          isOpen={isUpdatingModal}
          onClose={() => setIsUpdatingModal(false)}
        >
          <div style={{ position: 'relative' }}>
            <UpdateTaskForm
              onSubmit={(formData) =>
                updateTask({ taskId: task.task_id, newData: formData })
              }
              isPending={isUpdatingTask}
              initialData={{
                title: task.title,
                description: task.description,
                is_completed: task.is_completed,
                priority: task.priority,
                task_icon: task.task_icon
              }}
            />
          </div>
        </Modal>
      </li>
  )
}

export default React.memo(Task)
