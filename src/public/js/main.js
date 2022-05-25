const socket = io()


const chatMessage = document.querySelector(".chat-messages")
// console.log(chatMessage)




//đọc tin chat và gửi lên server
const chatForm = document.getElementById("chat-form")
const msg = document.getElementById('msg')
const client = document.getElementById('sender')

console.log(client.value)
if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault()

        //emit msg to server
        let chatMessage = msg.value
        socket.emit("on-chat", {
            sender: sender.value,
            message: chatMessage,
            timeStamp: Date.now()
        })
        msg.value = ''
        msg.focus()
    })
}

//function format timeStamp to Date
const formatDate = (timeStamp) => {
    let date = new Date(timeStamp)
    var h = date.getHours();
    var m = date.getMinutes();

    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    return h + ":" + m
}
//render html message
const createMessage = (msg) => {
    const div = document.createElement('div')
    div.classList.add('message-container')
    if (client.value === msg.sender) {
        div.innerHTML = `
        <div class ="message right">
        <p class="meta">${msg.sender} <span>${formatDate(msg.timeStamp)}</span></p>
        <p class="text">
            ${msg.message}
        </p>
        </div>   `
    } else {
        div.innerHTML = `
        <div class ="message left">
        <p class="meta">${msg.sender} <span>${formatDate(msg.timeStamp)}</span></p>
        <p class="text">
            ${msg.message}
        </p>
        </div>   `
    }

    document.querySelector('.chat-messages').appendChild(div)
    // console.log(div)
}


//nhận tin nhắn từ trên server gửi về
socket.on("user-chat", message => {
    console.log(message)
    console.log(typeof message.timeStamp)
    createMessage(message)

    //scroll
    chatMessage.scrollTop = chatMessage.scrollHeight
})
