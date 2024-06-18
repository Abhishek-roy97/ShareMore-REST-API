import ApplicationError from "../../middlewares/application.error.middleware.js";
import CommentModel from "./comment.model.js";

export default class CommentController {
    //Get comments of a Specific Post
    getComments(req, res, next){
        try {
            const postId = req.params.postId;
            const comments = CommentModel.get(postId);
            res.status(200).send(comments);
        } catch (error) {
            next(error);
        }
    }
    //Add comment to a specific Post
    addComment(req, res, next){
        const userId = req.userId;
        const postId = req.params.postId;
        const { content } = req.body;
        console.log(req.body);
        try{
            const newComment = CommentModel.add(userId, postId, content);
            res.status(201).send("Comment added to the Post");
        }catch(error){
            next(error);
        }
    }
    //Update a Comment
    updateComment(req, res, next){
        const id = req.params.id;
        const userId = req.userId;
        const { content } = req.body;
        try {
            const updatedPost = CommentModel.update(id, userId, content);
            res.status(200).json(updatedPost);
        } catch (error) {
            next(error);
        }
    }
    //Delete a Comment
    deleteComment(req, res, next){
        const id = req.params.id;
        const userId = req.userId;
        try {
            CommentModel.remove(id, userId);
            return res.status(200).send("Comment is Deleted");
        } catch (error) {
            next(error);
        }
    }

}