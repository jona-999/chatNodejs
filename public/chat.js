const socket = io();

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let button = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

button.addEventListener('click', function () {
    socket.emit('chat-message', {
        username: username.value, 
        message: message.value 
    });
});
message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value);
});

socket.on('server-message', function(data){
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', function(data) {
    actions.innerHTML = `<p><em>${data} is typing...</em></p>`
});