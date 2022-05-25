import express from "express"
import homeController from "../controller/homeController"

const Router = express.Router()

const initWebRoute = (app) => {

    Router.get("/", homeController.getHomePage)

    Router.post("/signin", homeController.authController)

    Router.get("/chat", homeController.getChatPage)

    // Router.post("/sendChat", homeController.sendChat)

    return app.use("/", Router)
}

export default initWebRoute
