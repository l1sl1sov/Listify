from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Task
from .serializer import TaskSerializer
from rest_framework.filters import OrderingFilter

#----------------------------------many tasks-----------------------------------------------

class TaskListView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ['created_at', 'is_completed', 'priority']
    ordering=['is_completed']

    #creating new task
    def post(self, request, *args, **kwargs): 
        serializer = self.get_serializer(data=request.data) 
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #deleting all tasks
    def delete(self, request):
        tasks = self.get_queryset()
        tasks.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class BulkDeleteTasksView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def delete(self, request, *args, **kwargs):
        task_ids = request.data.get('ids', [])
        
        if not task_ids:
            return Response(
                {"error": "No task IDs provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        deleted_count, _ = self.get_queryset().filter(task_id__in=task_ids).delete()
        
        return Response(
            {"message": f"Deleted {deleted_count} tasks"},
            status=status.HTTP_200_OK
        )

#----------------------------single task--------------------------------------------------

class TaskDetailView(generics. RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
        
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
        
class TaskCompleteView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def update(self, request, *args, **kwargs):
        task = self.get_object()
        task.complete_task()
        serializer = self.get_serializer(task)
        return Response(serializer.data)

class TaskReopenView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def update(self, request, *args, **kwargs):
        task = self.get_object()
        task.reopen_task()
        serializer = self.get_serializer(task)
        return Response(serializer.data)
