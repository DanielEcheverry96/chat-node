const socket = io.connect('http://192.168.1.61:6677', { 'forceNew': true });

// Recoger mensajes emitidos desde el Servidor
socket.on('messages', (data) => {
    console.log(data);
    render(data);
});

function render(data) {
    let html = data.map((message) => {
        return `<div class="message">
            <strong>${ message.nickname }</strong> dice:
            <p>${ message.text }</p>
        </div>`
    }).join(' ');

    let div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e) {
    const message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    nickname: document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);

    return false;
}