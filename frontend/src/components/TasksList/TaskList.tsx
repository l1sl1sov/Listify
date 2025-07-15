import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

import { useApi } from "../../hooks/useApi";
import { ORDERING_OPTIONS } from "../../constants/tasks";
import {
  TaskInterface,
  TaskOrdering,
  UpdateTaskData,
  AddTaskData,
} from "../../types/task";
import {
  deleteAllTasksService,
  fetchTasksService,
  deleteTaskService,
  deleteBulkService,
} from "../../services/tasksApiService";
import AddTaskIcon from "../../assets/icons/addtask-icon.png";

import Task from "../Task/Task";
import TaskForm from "../forms/TaskForm";
import ProgressBar from "../progressBar/ProgressBar";

import styles from "./TaskList.module.scss";

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [ordering, setOrdering] = useState<TaskOrdering>(
    () => (localStorage.getItem("ordering") as TaskOrdering) || "-created_at" // set saved ordering or default
  );
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  //api using hook
  const {
    callApi: fetchTasks,
    data: fetchedTasks,
    isLoading: isTasksLoading,
  } = useApi<[TaskOrdering], TaskInterface[]>({
    apiCall: (ordering) => fetchTasksService(ordering),
    onSuccess: (fetchedTasks) => setTasks(fetchedTasks),
    errorMessage: "Fetching tasks error",
  });

  const { callApi: deleteTask, isLoading: isTaskDeleting } = useApi<
    [string],
    void
  >({
    apiCall: (taskId: string) => deleteTaskService(taskId),
    errorMessage: "Deleting task error",
  });

  const { callApi: deleteAllTasks, isLoading: isDeletingAllTasks } = useApi<
    [],
    void
  >({
    apiCall: () => deleteAllTasksService(),
    errorMessage: "Deleting all tasks error",
  });

  useEffect(() => {
    localStorage.setItem("ordering", ordering);
    fetchTasks(ordering);
  }, [ordering]);

  const handleAddTask = async (newTask: TaskInterface) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const clearSelecting = () => {
    setSelectedTasks([]);
    setIsSelecting(false);
  };

  const deleteSelectedTasks = async () => {
    if (selectedTasks.length === 0) {
      toast.error("Select tasks to delete");
      return;
    }
    try {
      await deleteBulkService(selectedTasks);
      setTasks((prev) =>
        prev.filter((task) => !selectedTasks.includes(task.task_id))
      );
      clearSelecting();
    } catch (error) {
      console.error("Deleting selected tasks error:", error);
      toast.error("Server error");
    }
  };

  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const handleDeleteAllTasks = () => {
    const confirmed = window.confirm(
      "Are you sure that you want to delete all tasks?"
    );
    if (confirmed) {
      deleteAllTasks();
    }
  };

  const handleTaskStatusChange = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        return task.task_id === taskId
          ? { ...task, is_completed: !task.is_completed }
          : task;
      })
    );
  };

  const handleTaskUpdate = (taskToUpdate: UpdateTaskData) => {
    alert("типа запрос к апи");
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.task_id === taskToUpdate.taskId
          ? { ...task, ...taskToUpdate }
          : task
      )
    );
  };

  const completedTasksAmount = tasks.filter(
    (task) => task.is_completed === true
  ).length;

  const progress = tasks.length
    ? Math.round((completedTasksAmount / tasks.length) * 100)
    : 0;

  return (
    <div className={styles["tasklist-container"]}>
      <div className={styles["tasklist-info"]}>
        <div className={styles["first-block"]}>
          <h2 className={styles.title}>user's task list</h2>
          <button
            onClick={() => setIsAddingTask((prevState) => !prevState)}
            className={styles["showforms-button"]}
          >
            <img src={AddTaskIcon} alt="Add task" title="Add new task"></img>
          </button>
        </div>
        {isAddingTask && (
          <div className={styles["addtask-forms"]}>
            <TaskForm onSubmit={handleAddTask} />
          </div>
        )}
      </div>
      {tasks?.length > 0 ? (
        <>
          <ol className={styles["tasks-ol"]}>
            <div className={styles.controls}>
              <label>
                <select
                  onChange={(event) =>
                    setOrdering(event.target.value as TaskOrdering)
                  }
                  value={ordering}
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
            {tasks.map((task) => (
              <p key={task.task_id}>{task.description}</p>
            ))}
          </ol>
          <div>
            <button
              onClick={handleDeleteAllTasks}
              className={styles["delete-tasks-button"]}
            >
              Delete all tasks
            </button>
            {isSelecting ? (
              <div>
                <button
                  className={styles["delete-tasks-button"]}
                  onClick={deleteSelectedTasks}
                >
                  Delete selected tasks
                </button>
                <button onClick={() => setIsSelecting(false)}>
                  Exit selecting mode
                </button>
              </div>
            ) : (
              <button
                className={styles["delete-tasks-button"]}
                onClick={() => setIsSelecting(true)}
              >
                Select tasks to delete
              </button>
            )}
          </div>
        </>
      ) : (
        <div>No tasks</div>
      )}
    </div>
  );
};

export default TaskList;
