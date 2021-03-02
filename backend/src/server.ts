import express, { Application } from 'express'
import {json} from "body-parser";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http';
import config from './config/config'
import routes from './routes'
import passport from 'passport'
import { dbConfig } from './persistence'
import './auth/passport'



const app:Application = express()

/**
 * Middleware configuration
 */
app.use(cors())
app.use(json())
app.use(cookieParser())
app.use(passport.initialize())

/**
 * Routes
 */
app.get('/healthcheck', (req, res) => {
    res.status(200).json({online:true})
})

app.use(routes)

/**
 * Server Start
 */
const httpServer = http.createServer(app);

dbConfig
.connect()
.then(() => {
    httpServer.listen(config.server.port, "0.0.0.0", () => console.log(`Server up in port ${config.server.port}`));
})

