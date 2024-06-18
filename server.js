import bodyParser from 'body-parser';
import express from 'express';

import jwtAuth from "./src/middlewares/jwt.middleware.js"

import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/posts/post.routes.js';
import commentRoutes from './src/features/comments/comment.routes.js';
import likeRoutes from './src/features/likes/likes.routes.js';

import ApplicationError from './src/middlewares/application.error.middleware.js';

const server = express();

server.use(bodyParser.json());

server.get('/',(req, res)=>{ 
    res.send('Welcome to ShareMore social-media API')
})

server.use('/api/user', userRouter);
server.use('/api/posts', jwtAuth, postRouter);
server.use('/api/comments',jwtAuth,commentRoutes);
server.use('/api/likes',jwtAuth, likeRoutes);

//Error Handling Middlewares
server.use((err, req, res, next) => {
    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message);
    }
    res.status(500).send("Something went wrong");
})


server.listen(3100, ()=>{
    console.log('Server is running at 3100');
})

