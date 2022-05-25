
import cors from 'cors'
import express from 'express'
import session from 'express-session'


const viewEngineConfigc = (app) => {
    app.set("view engine", "ejs")
    app.use(express.static('./src/public'))
    app.set("views", "./src/views")
    app.use(cors())

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }))

    // parse application/json
    app.use(express.json())

    //session
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }))
}

export default viewEngineConfigc