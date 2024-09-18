from django.urls import path
from .views import chat_view, add_reply_view

urlpatterns = [
    path('chat/', chat_view, name='chat'),
    path('add-reply/', add_reply_view, name='add_reply'),
]
