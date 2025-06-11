import styles from './Task.module.scss';
import axios from 'axios';

import { TASKS_API } from '../../constants/api';
import { TaskInterface } from '../../types/task';
import { useState } from 'react';
import { toast } from 'react-toastify';
import deleteTaskIcon from '../../assets/icons/deletetask-icon.png';
import completeTaskIcon from '../../assets/icons/completetask-icon.png';
import reopenTaskIcon from '../../assets/icons/reopentask-icon.png';
import editTaskIcon from '../../assets/icons/edittask-icon.png';
import { MdOutlineStarOutline } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { AddTaskProps } from '../../types/task';

import { Modal } from '../modals/Modal';
import TaskForm from '../forms/TaskForm';

interface TaskProps {
    task: TaskInterface;
    deleteTask: (taskId: string) => void;
    onStatusChange: (taskId: string) => void;
    onTaskChange: (taskId: string, newTitle: string, newDescription: string, is_completed: boolean, priority: number, task_icon: string) => void;
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>;
    isSelectingMode: boolean;
    selectedTasks: string[];
}

const Task = ({task, deleteTask, onStatusChange, onTaskChange, setSelectedTasks, isSelectingMode, selectedTasks}: TaskProps) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const switchCompleteStatus = async (taskId: string) => {
        try {
            if (!task.is_completed) {
                await axios.patch(`${TASKS_API}${taskId}/complete/`);
            } else {
                await axios.patch(`${TASKS_API}${taskId}/reopen/`);
            }
            onStatusChange(task.task_id);
        } catch (error) {
            console.error('Completing task error:', error);
            toast.error('Server error');
        }
    }

    const handleEditTask = async (data: AddTaskProps) => {
        if (!data.title?.trim()) {
            toast.error(`Field 'title' is required`);
            return;
        }
    
        try {
            await axios.patch(`${TASKS_API}${task.task_id}/`, {
                title: data.title,
                description: data.description,
                is_completed: data.is_completed,
                priority: data.priority,
                task_icon: data.task_icon,
            });
            onTaskChange(
                task.task_id, 
                data.title, 
                data.description || '', 
                data.is_completed, 
                data.priority, 
                data.task_icon
            );
            setIsEditing(false);
            toast.success('Task updated successfully');
        } catch (error) {
            console.error('Changing task error:', error);
            toast.error('Server error');
        }
    }

    const handleTaskSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const taskId = task.task_id

        isChecked ? setSelectedTasks(prev => [...prev, taskId]) : setSelectedTasks(prev => prev.filter(id => id !== taskId))
    }

    return (
    <li className={styles.task} key={task.task_id}>
        <div className={styles['first-block']}>
        {isSelectingMode && (
            <div>
                <label className={styles['select-task']}>
                    <input type='checkbox' onChange={handleTaskSelect} checked={selectedTasks.includes(task.task_id)}></input>
                    <div className={styles.checkmark}></div>
                </label>
            </div>
        )}
            <div className={styles.priority}>
                {Array.apply(null, Array(3)).map((_, i) => (
                    i+1 <= task.priority ? <MdOutlineStarPurple500 key={i}/> : <MdOutlineStarOutline key={i}/> 
                ))}
            </div>
            <div className={`${ styles['task-info'] } ${ task.is_completed ? styles['task-completed'] : ''}`}>
                <div className={styles.icon}>
                    <img src={`/images/task-icons/${task.task_icon}.png`}></img>
                </div>
                <div className={styles.texts}>
                    <span className={styles['task-title']}>
                        {task.title}
                    </span>
                    {task.description && (<span>
                        {task.description}
                    </span>)}
                </div>
            </div>
        </div>
        <div className={styles.forms}>
            <button title='Delete task'
            onClick={() => deleteTask(task.task_id)}>
                <img src={deleteTaskIcon} alt="delete task" />
            </button>
            <button title={ task.is_completed ? 'Reopen task' : 'Complete task'}
            onClick={() => switchCompleteStatus(task.task_id)}>
                { task.is_completed ?
                <img src={reopenTaskIcon} alt='reopen task' style={{
                    transform: 'scale(1.25)',
                }}></img>
                : <img src={completeTaskIcon} alt='complete task'></img> }
            </button>
            <button title='Edit task'
            onClick={() => setIsEditing(true)}>
                <img src={editTaskIcon} alt="edit task" />
            </button>
        </div>
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
            <div style={{ position: 'relative' }}>
                <TaskForm
                    onSubmit={handleEditTask}
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

export default Task