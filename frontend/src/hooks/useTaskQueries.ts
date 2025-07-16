import { useQuery } from "@tanstack/react-query"
import { TaskInterface } from "../types/task";
import { fetchTasksService } from "../services/tasksApiService"
import { TaskOrdering } from "../types/task";

export const useFetchTasks = (ordering: TaskOrdering) => {
    const { data: tasks = [], isLoading: isTasksFetching } = useQuery<TaskInterface[]>({
        queryKey: ['tasks', ordering],
        queryFn: () => fetchTasksService(ordering),
        staleTime: 5000,
    });

    return { tasks, isTasksFetching }
}