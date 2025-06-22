// DOM elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const statusIndicator = document.getElementById('status-indicator');

// Initial bot greeting
window.onload = function() {
    addBotMessage("Hello! I'm your academic assistant. How can I help you today?");
};

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Insert suggestion into input field
function insertSuggestion(text) {
    userInput.value = text;
    userInput.focus();
}

// Add user message to chat
function addUserMessage(text) {
    const messageElement = document.createElement('p');
    messageElement.classList.add('user-message');
    messageElement.innerHTML = `<strong>You:</strong> ${text}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Add bot message to chat
function addBotMessage(text) {
    const messageElement = document.createElement('p');
    messageElement.classList.add('bot-message');
    messageElement.innerHTML = `<strong>Bot:</strong> ${text.replace(/\n/g, '<br>')}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message to server
async function sendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    addUserMessage(message);
    userInput.value = '';
    
    // Show loading state
    sendButton.disabled = true;
    statusIndicator.style.background = '#ff9800';
    
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        addBotMessage(data.response);
    } catch (error) {
        console.error('Error:', error);
        addBotMessage("Sorry, I'm having trouble connecting. Please try again later.");
    } finally {
        // Reset UI
        sendButton.disabled = false;
        statusIndicator.style.background = '#4caf50';
        userInput.focus();
    }
}
