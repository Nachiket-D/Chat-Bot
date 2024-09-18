document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('chat-form');
    const messageInput = document.getElementById('message');
    const chatMessages = document.getElementById('chat-messages');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = messageInput.value.trim();

        if (message) {
            // Append message to chat
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messageElement.classList.add('message');
            chatMessages.appendChild(messageElement);

            // Clear the input field
            messageInput.value = '';

            // Scroll to the bottom of the chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
});
