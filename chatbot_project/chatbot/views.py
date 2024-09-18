import json
import os
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Path to the JSON file
JSON_FILE_PATH = os.path.join(os.path.dirname(__file__), 'data', 'replies.json')

def load_replies():
    """Load replies from the JSON file."""
    with open(JSON_FILE_PATH, 'r') as file:
        return json.load(file)

def save_replies(replies):
    """Save replies to the JSON file."""
    with open(JSON_FILE_PATH, 'w') as file:
        json.dump(replies, file, indent=4)

@csrf_exempt
def chat_view(request):
    if request.method == 'POST':
        user_message = request.POST.get('message').strip().lower()
        
        # Load predefined replies
        replies = load_replies()
        
        # Check for predefined replies
        reply = replies.get(user_message, None)
        
        if reply:
            return JsonResponse({'reply': reply})
        else:
            # Return a response indicating that the message is not found
            return JsonResponse({'error': 'Message not found'})

    return render(request, 'chatbot/chat.html')

@csrf_exempt
def add_reply_view(request):
    if request.method == 'POST':
        user_message = request.POST.get('message').strip().lower()
        new_reply = request.POST.get('reply').strip()
        
        # Load replies
        replies = load_replies()
        
        # Add new reply
        replies[user_message] = new_reply
        save_replies(replies)
        
        return redirect('chat')

    # Handle GET request for the form
    message = request.GET.get('message', '')
    return render(request, 'chatbot/add_reply.html', {'message': message})
