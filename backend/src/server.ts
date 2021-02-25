import express, { Application } from 'express'
import {json} from "body-parser";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http';
import config from './config/config'
import routes from './routes'
import passport from 'passport'
import './auth/passport'

const app:Application = express()

/**
 * Middleware configuration
 */
app.use(json())
app.use(cors())
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

httpServer.listen(config.server.port, () => console.log(`Server up in port ${config.server.port}`));

