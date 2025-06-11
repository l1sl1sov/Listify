from django.urls import path, register_converter
from .views import *
import uuid

class UUIDPathConverter:
    regex = r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"

    def to_python(self, value):
        return uuid.UUID(value)

    def to_url(self, value):
        return str(value)

register_converter(UUIDPathConverter, 'uuid')

urlpatterns = [
    path('', TaskListView.as_view(), name='task-list'),
    path('<uuid:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('<uuid:pk>/complete/', TaskCompleteView.as_view(), name='task-complete'),
    path('<uuid:pk>/reopen/', TaskReopenView.as_view(), name='task-reopen'),
    path('bulk-delete/', BulkDeleteTasksView.as_view(), name='bulk-delete-tasks'),
]