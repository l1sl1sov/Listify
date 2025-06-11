from django.db import models
from django.utils import timezone
import uuid

class Task(models.Model):
    priority = models.IntegerField(default=2)
    task_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=128)
    task_icon = models.CharField(max_length=24, default='note')
    description = models.TextField(max_length=500, blank=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.title

    def complete_task(self):
        if not self.is_completed:
            self.is_completed = True
            self.completed_at = timezone.now()
            self.save()

    def reopen_task(self):
        if self.is_completed:
            self.is_completed = False
            self.save()