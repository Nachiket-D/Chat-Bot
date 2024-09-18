document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chat-form');
    const messageInput = document.getElementById('message');
    const chatMessages = document.getElementById('chat-messages');

    // Get CSRF token from the cookie
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrfToken = getCookie('csrftoken');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const message = messageInput.value.trim();
        if (message) {
            appendMessage('You: ' + message, 'user-message'); // User message styling

            fetch('/chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrfToken  // Include CSRF token
                },
                body: new URLSearchParams({
                    'message': message,
                }),
            })
            .then(response => {
                if (response.redirected) {
                    // Redirect to the new URL
                    window.location.href = response.url;
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    if (data.reply) {
                        appendMessage('Bot: ' + data.reply, 'bot-message'); // Bot message styling
                    } else if (data.error === 'Message not found') {
                        if (confirm("Sorry, I don\'t have the reply for the requested question. Do you want to add a reply to it?")) {
                            window.location.href = '/add-reply/?message=' + encodeURIComponent(message);
                        } else {
                            appendMessage('Bot: Sorry, I don\'t know how to respond to that.', 'bot-message'); // Default bot message
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

            messageInput.value = '';
        }
    });

    function appendMessage(text, messageType) {
        const messageElement = document.createElement('div');
        messageElement.textContent = text;
        messageElement.classList.add('message', messageType); // Add class for styling
        chatMessages.appendChild(messageElement);
    }
});
