import bodyParser from 'body-parser';
import express from 'express';
import swagger from "swagger-ui-express";

import jwtAuth from "./src/middlewares/jwt.middleware.js"
import loggerMiddleware from './src/middlewares/logger.middleware.js';

import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/posts/post.routes.js';
import commentRoutes from './src/features/comments/comment.routes.js';
import likeRoutes from './src/features/likes/likes.routes.js';
import apiDocs from "./swagger.json" assert { type: "json" };

import ApplicationError from './src/middlewares/application.error.middleware.js';

const server = express();

server.use(bodyParser.json());
server.use(loggerMiddleware);

server.get('/',(req, res)=>{ 
    res.send('Welcome to ShareMore social-media API')
})

server.use("/api/docs", swagger.serve, swagger.setup(apiDocs));
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

server.use((req, res)=> {
    res.status(404).json("API not found for request. Please verify the document to know more information at localhost:3100/api/docs");
});


server.listen(3100, ()=>{
    console.log('Server is running at 3100');
})

