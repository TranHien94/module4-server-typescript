import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

//Create server
const server = express()

//Setup body parser
import bodyParser from "body-parser";
server.use(bodyParser.json())

/*Setup cors*/
import cors from 'cors'
server.use(cors())

/*Setup api config*/
import apiConfig from './route';
server.use('/apis', apiConfig)

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on link: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
})
