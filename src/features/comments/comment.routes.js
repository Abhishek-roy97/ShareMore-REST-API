import express from "express";
import CommentController from "./comment.controller.js";

const commentRoutes = express.Router();
const commentController = new CommentController();

commentRoutes.get('/:postId',commentController.getComments);
commentRoutes.post('/:postId',commentController.addComment);
commentRoutes.put('/:id',commentController.updateComment);
commentRoutes.delete('/:id',commentController.deleteComment);



export default commentRoutes;