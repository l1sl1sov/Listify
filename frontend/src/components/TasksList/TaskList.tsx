import styles from './TaskList.module.scss';
import Task from '../Task/Task';
import TaskForm from '../forms/TaskForm';
import { TASKS_API } from '../../constants/api';
import { TaskInterface } from '../../types/task';
import { AddTaskProps } from '../../types/task';
import AddTaskIcon from '../../assets/icons/addtask-icon.png';
import ProgressBar from '../progressBar/ProgressBar';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

const TaskList = () => {

    //API
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [ordering, setOrdering] = useState<string>('is_completed');
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get<TaskInterface[]>(`${TASKS_API}?ordering=${ordering}`);
            setTasks(response.data)
        } catch (error) {
            console.error('Fetching tasks error:', error);
            toast.error('Server error');
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [ordering])

    const deleteTask = async (taskId: string) => {
        try {
            await axios.delete(`${TASKS_API}${taskId}/`)
            setTasks(prevTasks => prevTasks.filter(task => task.task_id !== taskId))
        } catch (error) {
            console.error('Deleting task error:', error);
            toast.error('Server error');
        }
    }

    const deleteAllTasks = async () => {
        const confirmed = window.confirm('Вы точно хотите удалить все задачи?')
        if (confirmed) {
            try {
                await axios.delete(TASKS_API);
                setTasks([])
            } catch (error) {
                console.error('Deleting all tasks error:', error);
                toast.error('Server error');
            }
        }
    }

    const addTask = async ({ title, description, is_completed, priority, task_icon }: AddTaskProps) => {
        try {
            const response = await axios.post(TASKS_API,
                {title, description, is_completed, priority, task_icon})
            const newTask = response.data
            setTasks(prevTasks => [...prevTasks, newTask])
        } catch (error) {
            console.error('Adding task error:', error);
            toast.error('Server error');
        }
    }

    const deleteSelectedTasks = async () => {
        if (selectedTasks.length === 0) {
            toast.error('Select tasks to delete');
            return
        }
        try {
            await axios.delete(`${TASKS_API}bulk-delete/`, { 
                data: { ids: selectedTasks } 
            });
            setTasks(prev => prev.filter(task => !selectedTasks.includes(task.task_id)));
            setSelectedTasks([]);
            setIsSelecting(false);
        } catch (error) {
            console.error('Deleting selected tasks error:', error)
            toast.error('Server error');
        }
    }


    //inner logic
    const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
    const [isSelecting, setIsSelecting] = useState<boolean>(false);

    const sortTasks = (tasks: TaskInterface[]): TaskInterface[] => {
        const sortedTasks = [...tasks];
    
        const comparators = {
            is_completed: (a: TaskInterface, b: TaskInterface) => 
                Number(a.is_completed) - Number(b.is_completed),
            created_at: (a: TaskInterface, b: TaskInterface) =>
                new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            priority: (a: TaskInterface, b: TaskInterface) =>
                a.priority - b.priority,
        };

        const [field, direction] = ordering.startsWith('-') 
            ? [ordering.slice(1), 'desc'] : [ordering, 'asc'];

        if (comparators[field as keyof typeof comparators]) {
            sortedTasks.sort((a, b) => {
                const compare = comparators[field as keyof typeof comparators];
                return direction === 'asc' ? compare(a, b) : compare(b, a);
            });
        }

    return sortedTasks;
    };

    const handleTaskStatusChange = (taskId: string) => {
        setTasks(prevTasks => prevTasks.map(task => {
            return task.task_id === taskId ? { ...task, is_completed: !task.is_completed } : task
        }));
    };

    const handleTaskChange = (
        taskId: string, 
        newTitle: string, 
        newDescription: string,
        is_completed: boolean,
        priority: number,
        task_icon: string
    ) => {
        setTasks(prevTasks => prevTasks.map(task => {
            return task.task_id === taskId ? {
                ...task,
                title: newTitle,
                description: newDescription,
                is_completed,
                priority,
                task_icon
            } : task;
        }));
    }

    const completedTasksAmount = tasks.filter(task =>task.is_completed === true).length

    const progress = tasks.length ? Math.round((completedTasksAmount / tasks.length) * 100) : 0;

    return(
        <div className={styles['tasklist-container']}>
            <div className={styles['tasklist-info']}>
                <div className={styles['first-block']}>
                    <h2 className={styles.title}>user's task list</h2>
                    <button onClick={() => setIsAddingTask(prevState => !prevState)} className={styles['showforms-button']}>
                        <img
                        src={AddTaskIcon}
                        alt='Add task'
                        title='Add new task'></img>
                    </button>
                </div>
                {isAddingTask && (
                    <div className={styles['addtask-forms']}>
                        <TaskForm onSubmit={addTask}/>
                    </div>
                    )
                }
            </div>
            {tasks?.length > 0 ? (<>
            <ol className={styles['tasks-ol']}>
                <div className={styles.controls}>
                    <label>
                        <select onChange={(event) => setOrdering(event.target.value)} value={ordering}>
                            <option value='-created_at'>New tasks first</option>
                            <option value='created_at'>Old tasks first</option>
                            <option value='is_completed'>Unfinished tasks first</option>
                            <option value='-is_completed'>Finished tasks first</option>
                            <option value='-priority'>Highest priority tasks first</option>
                            <option value='priority'>Lowest priority tasks first</option>
                        </select>
                    </label>
                    <ProgressBar value={progress} message={`Tasks completed on ${progress}%`}/>
                </div>
                {sortTasks(tasks).map(task => (
                    <Task
                    key={task.task_id}
                    task={task}
                    deleteTask={deleteTask}
                    onStatusChange={handleTaskStatusChange}
                    onTaskChange={handleTaskChange}
                    setSelectedTasks={setSelectedTasks}
                    isSelectingMode={isSelecting}
                    selectedTasks={selectedTasks}/>
                ))}
            </ol>
            <div>
                <button
                onClick={deleteAllTasks}
                className={styles['delete-tasks-button']}>
                Delete all tasks
                </button>
                {isSelecting ? (
                    <div><button className={styles['delete-tasks-button']} onClick={deleteSelectedTasks}>
                        Delete selected tasks
                    </button>
                    <button onClick={() => setIsSelecting(false)}>
                        Exit selecting mode
                    </button></div>
                ) : <button className={styles['delete-tasks-button']}
                onClick={() => setIsSelecting(true)}>
                    Select tasks to delete
                </button>}
            </div></>): (
                <div>No tasks</div>
            )}
        </div>
    )
}

export default TaskList