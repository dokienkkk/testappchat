import User from "../model/user"
import chat from "../model/chat"

const getHomePage = (req, res) => {
    res.status(200).render('login')
}

const getChatPage = async (req, res) => {
    console.log(req.session.sender)
    const user = await User.find()

    const chatMessage = await chat.find()

    if (user) {
        return res.render("chat", {
            sender: req.session.sender,
            user,
            chatMessage

        })
    }
}

const authController = async (req, res) => {
    const email = req.body.email
    const username = req.body.username

    //create new user from database
    const newUser = new User({
        email,
        username,
        isOnline: true
    })
    //save new user to db
    try {
        await User.create(newUser)
        req.session.sender = username
        return res.redirect("/chat")
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getHomePage,
    getChatPage,
    authController,
}