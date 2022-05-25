import mongoose from "mongoose";

const Schema = mongoose.Schema

const chatSchema = new Schema({
    sender: {
        type: String
    },
    message: {
        type: String
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: "Chat"
})

const chat = mongoose.model('chat', chatSchema)

export default chat