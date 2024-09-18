from django.db import models

class UserMessage(models.Model):
    message = models.TextField()
    reply = models.TextField()

    def __str__(self):
        return self.message
