import express, { Application } from 'express'
import {json} from "body-parser";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import path from 'path'
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
app.use(cookieParser())
app.use(json())
app.use(passport.initialize())

// Static folder
app.use('/static', express.static(__dirname + '/uploads'));

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
.connect(process.env.MONGO_URI || '')
.then(() => {
    httpServer.listen(config.server.port, "0.0.0.0", () => console.log(`Server up in port ${config.server.port}`));
})



