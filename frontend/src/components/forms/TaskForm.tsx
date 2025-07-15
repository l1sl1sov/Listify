import styles from './TaskForm.module.scss';

import { FormEvent } from 'react';
import { useCallback, useState } from 'react';

import { toast } from 'react-toastify';
import SelectTaskIcon from '../SelectTaskIcon/SelectTaskIcon';

interface TaskFormProps {
    onSubmit: (data: AddTaskData) => void;
    initialData?: Partial<AddTaskData>;
}

const TaskForm = ({ onSubmit, initialData }: TaskFormProps) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [isCompleted, setIsCompleted] = useState(initialData?.is_completed || false);
    const [priority, setPriority] = useState(initialData?.priority || 2);
    const [icon, setIcon] = useState(initialData?.task_icon || 'note');

    const clearData = () => {
        setTitle('');
        setDescription('');
        setIsCompleted(false);
        setPriority(2);
        setIcon('note');
    }

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();
        if ( !title.trim() ) {
            toast.error(`Field 'title' is required`);
            return;
        }
        if ( title.length > 128 || (description && description.length > 500 )) {
            toast.error(`Field 'title' or 'description' is too long`);
            return;
        }
        try {
            await onSubmit({
                title: title,
                description: description,
                is_completed: isCompleted,
                priority: priority,
                task_icon: icon,
            });
            clearData();
        } catch (error) {
            console.error('Handling submit error:', error);
            toast.error('Server error');
        }
    }, [onSubmit, title, description, isCompleted, priority, icon]);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
            type='text'
            value={title}
            placeholder='Task name'
            onChange={(event) => setTitle(event.target.value)}
            className={styles.title}/>
            <textarea
            value={description}
            placeholder='Task description'
            onChange={(event) => setDescription(event.target.value)}
            className={styles.description}/>
            <div
            className={styles.options}>
                <div className={styles.completeness}>
                    <label className={styles.option}>
                        <input type='radio' name='isCompleted' value='completed' checked={isCompleted === true} onChange={() => setIsCompleted(true)}/>
                        Completed
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name='isCompleted' value='uncompleted' checked={isCompleted === false} onChange={() => setIsCompleted(false)}/>
                        Uncompleted
                    </label>
                </div>
                <div className={styles.priority}>
                Priority: <select value={priority} onChange={(event) => setPriority(Number(event.target.value))}>
                    <option value='1'>Low</option>
                    <option value='2'>Medium</option>
                    <option value='3'>High</option>
                </select>
                </div>
                <SelectTaskIcon setIcon={setIcon}/>
            </div>
            <button
            type='submit'
            className={styles['createtask-button']}>
                { initialData ? 'Edit task' : 'Create task' }
            </button>
        </form>
    )
}

export default TaskForm