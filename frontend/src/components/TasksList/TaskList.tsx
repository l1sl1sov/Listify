import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { TaskSkeletonLoader } from '../skeleton/TaskSkeleton/TaskSkeletonLoader'

import { useFetchTasks } from '../../hooks/useFetchTasks'

import { ORDERING_OPTIONS } from '../../constants/tasks'
import { TaskOrdering, TaskId } from '../../types/task'
import AddTaskIcon from '../../assets/icons/addtask-icon.png'
import { useCreateTask } from '../../hooks/useCreateTask'
import { useDeleteAllTasks } from '@/hooks/useDeleteAllTasks'
import { useDeleteBulkTasks } from '@/hooks/useDeleteBulkTasks'

import AddTaskForm from '../forms/AddTaskForm'
import ProgressBar from '../progressBar/ProgressBar'

import TaskItem from '../Task/TaskItem'

const TaskList = ({ debouncedValue }: { debouncedValue: string }) => {
  const [ordering, setOrdering] = useState<TaskOrdering>(
    () => (localStorage.getItem('ordering') as TaskOrdering) || '-created_at' // set saved ordering or default
  )
  const [isAddingTaskMode, setIsAddingTaskMode] = useState<boolean>(
    localStorage.getItem('addingTaskMode') === 'true'
  )
  const [selectedTasks, setSelectedTasks] = useState<TaskId[]>([])
  const [isSelectingMode, setIsSelectingMode] = useState<boolean>(
    localStorage.getItem('selectingMode') === 'true'
  )

  const { tasks, isTasksFetching, isPlaceholderData } = useFetchTasks(ordering)
  const { createTask, isCreatingTask } = useCreateTask()
  const { deleteAllTasks, isDeletingAllTasks } = useDeleteAllTasks()
  const { deleteBulkTasks, isDeletingBulkTasks } = useDeleteBulkTasks()

  useEffect(() => {
    localStorage.setItem('ordering', ordering)
  }, [ordering])

  useEffect(() => {
    localStorage.setItem('addingTaskMode', String(isAddingTaskMode))
  }, [isAddingTaskMode])

  useEffect(() => {
    localStorage.setItem('selectingMode', String(isSelectingMode))
  }, [isSelectingMode])

  const clearSelecting = () => {
    setSelectedTasks([])
    setIsSelectingMode(false)
  }

  const handleDeleteAllTasks = () => {
    const confirmed = confirm(
      'Are you sure you want to delete all tasks? This action cannot be undone.'
    )
    if (!confirmed) return
    deleteAllTasks()
  }

  const handleDeleteBulk = () => {
    if (selectedTasks.length) {
      deleteBulkTasks(selectedTasks)
    } else {
      toast.error('You marked no tasks to delete')
    }
  }

  const completedTasksAmount = tasks.filter((task) => task.is_completed).length

  const progress =
    tasks.length > 0
      ? Math.round((completedTasksAmount / tasks.length) * 100)
      : 0

  return (
    <div className="p-6 border-2 border-blue-500 shadow-md rounded-lg w-full flex flex-col gap-8 [&>*]:text-black">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold capitalize">user's task list</h2>
          <button
            onClick={() => setIsAddingTaskMode((prev) => !prev)}
            className="bg-transparent p-0"
          >
            <img
              src={AddTaskIcon}
              alt="Add task"
              title="Add new task"
              className="w-6 h-6"
            />
          </button>
        </div>

        {isAddingTaskMode && (
          <div className="border border-blue-500 w-full p-4 rounded-xl shadow-md">
            <AddTaskForm onSubmit={createTask} isPending={isCreatingTask} />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center w-full">
        <label>
          <select
            onChange={(e) => setOrdering(e.target.value as TaskOrdering)}
            value={ordering}
            className="border rounded px-2 py-1"
          >
            {ORDERING_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <ProgressBar
          value={progress}
          message={`Tasks completed on ${progress}%`}
        />
      </div>

      {isTasksFetching ? (
        <ol className={'flex flex-col gap-1'}>
          {Array.from(Array(10)).map((_, i) => (
            <TaskSkeletonLoader key={i} />
          ))}
        </ol>
      ) : tasks.length > 0 ? (
        <>
          <ol
            className={`flex flex-col gap-1  ${isPlaceholderData ? 'opacity-50' : ''}`}
          >
            {debouncedValue
              ? (() => {
                  const foundTasksArr = tasks.filter((task) =>
                    (task.description || task.title).includes(debouncedValue)
                  )
                  return foundTasksArr.length ? (
                    foundTasksArr.map((task) => (
                      <TaskItem
                        task={task}
                        key={task.task_id}
                        selectParams={{
                          isSelectingMode,
                          setSelectedTasks,
                          selectedTasks
                        }}
                      />
                    ))
                  ) : (
                    <div>Task not found</div>
                  )
                })()
              : tasks.map((task) => (
                  <TaskItem
                    task={task}
                    key={task.task_id}
                    selectParams={{
                      isSelectingMode,
                      setSelectedTasks,
                      selectedTasks
                    }}
                  />
                ))}
          </ol>

          <div className="space-x-2">
            <button
              className="px-2 py-1 bg-red-600 rounded font-semibold transition-all hover:bg-red-700"
              onClick={handleDeleteAllTasks}
              disabled={isDeletingAllTasks}
            >
              {isDeletingAllTasks
                ? 'Deleting all tasks...'
                : 'Delete all tasks'}
            </button>

            {isSelectingMode ? (
              <div className="space-x-2">
                <button
                  className="px-2 py-1 bg-red-600 rounded font-semibold transition-all hover:bg-red-700"
                  onClick={handleDeleteBulk}
                  disabled={isDeletingBulkTasks}
                >
                  {isDeletingBulkTasks
                    ? 'Deleting selected tasks...'
                    : 'Delete selected tasks'}
                </button>
                <button
                  onClick={clearSelecting}
                  className="px-2 py-1 bg-gray-200 rounded transition-all hover:bg-gray-300"
                >
                  Exit selecting mode
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSelectingMode(true)}
                className="px-2 py-1 bg-red-600 rounded font-semibold transition-all hover:bg-red-700"
              >
                Select tasks to delete
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-gray-500">No tasks found.</div>
      )}
    </div>
  )
}

export default TaskList
