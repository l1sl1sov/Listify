export interface TaskInterface {
    task_id: string;
    task_icon: string;
    title: string;
    description?: string;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
    completed_at: string | null;
    priority: number;
}

export interface AddTaskProps {
    title: string;
    description: string;
    is_completed: boolean;
    priority: number;
    task_icon: string;
}