import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import userRouter from './src/routes/usersRoutes.js'
import postRoutes from './src/routes/postRoutes.js'
import friendshipRouter from './src/routes/friendshipRoutes.js'
import notificationRouter from './src/routes/notificationRoutes.js'
import statuRouter from './src/routes/statusRoutes.js'
import photosRouter from './src/routes/photosRoutes.js'
import eventsRouter from './src/routes/eventsRoutes.js'
import commentRouter from './src/routes/commentRouter.js'
import eventAtendeeRouter from './src/routes/EventAtendee.js'
import likesRouter from './src/routes/likesRouter.js'
import messageRouter from './src/routes/messageRoutes.js'
import groupMemberRouter from './src/routes/groupMembersRoutes.js'
import groupRouter from './src/routes/groupRoutes.js'
import groupPostRouter from './src/routes/groupPostRoutes.js'

import chatRouter from './src/routes/chatMessageRoutes.js'

import videoRoutes from './src/routes/videoRoutes.js'
import videoCategoryRoutes from './src/routes/videoCategoryRoutes.js'


dotenv.config()

const app=express() 
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
}
const PORT=process.env.PORT || 3500

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors(corsOptions));

app.use('/api',userRouter)
app.use('/api',postRoutes)
app.use('/api',friendshipRouter)
app.use('/api',notificationRouter)
app.use('/api',statuRouter)
app.use('/api',photosRouter)
app.use('/api',eventsRouter)
app.use('/api',commentRouter)
app.use ('/api',eventAtendeeRouter)
app.use('/api',likesRouter)
app.use('/api',messageRouter)
app.use('/api',groupMemberRouter)
app.use('/api',groupRouter)
app.use('/api',groupPostRouter)
app.use('/api',chatRouter)



app.use('/api', videoRoutes)
app.use('/api', videoCategoryRoutes)


app.listen(PORT,()=>{
    console.log(`This app is running on port ${PORT}`);
})