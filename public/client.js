
const socket = io()

let name;
let textarea = document.querySelector('#textarea');
let msgarea = document.querySelector('.msg-area');

do {
    name = prompt("please enter your name: ");
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter'){
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    // append

    appendMessage(msg, 'outgoing')
    textarea.value = '';
    scrollToBottom();

    // send to server
    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type
    mainDiv.classList.add(className, 'msg');

    let markUp = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markUp;

    msgarea.appendChild(mainDiv);
}


// Recieve message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom();
})

function scrollToBottom() {
    msgarea.scrollTop = msgarea.scrollHeight;
}