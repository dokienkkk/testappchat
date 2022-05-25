import express from "express"
import viewEngineConfigc from "./src/configc/viewEngine"
import initWebRoute from "./src/route/web"
import http from 'http'
import socketio from 'socket.io'
import mongoose from 'mongoose'
import chat from './src/model/chat'

require('dotenv').config()
const app = express()
const server = http.createServer(app)
const io = socketio(server)




const port = process.env.PORT || 8080

viewEngineConfigc(app)
initWebRoute(app)


//connect database
mongoose.connect("mongodb://localhost:27017/appchat",
    { useNewUrlParser: true }
)

//ket noi web socket
io.on('connection', socket => {
    // console.log("A user connected")
    //nhận chat từ user gửi lên
    socket.on("on-chat", async (data) => {
        // console.log(data)
        //server gửi lại chat cho toàn bộ client:
        io.emit("user-chat", data)

        //lưu vào database
        await chat.create({
            sender: data.sender,
            message: data.message,
            timeStamp: data.timeStamp
        })
    })
})

server.listen(port, () => {
    console.log("Server run at port " + port)
})