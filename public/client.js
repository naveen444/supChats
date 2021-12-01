
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
        message: message
    }

    // append

    appendMessage(msg, 'outgoing')
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
