import mongoose from "mongoose"

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
}, {
    collection: "Users"
})

const User = mongoose.model('User', UserSchema)

export default User