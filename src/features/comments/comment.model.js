import ApplicationError from "../../middlewares/application.error.middleware.js";
import PostModel from "../posts/post.model.js";

export default class CommentModel {
    constructor(id, userId, postId, content){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }
    //Get Comments of Specific Post
    static get(postId){
        const getComments = comments.filter((c)=> c.postId == postId);
        if (getComments.length === 0) {
            throw new ApplicationError("No comments for this specific Post", 404);
        }

        return getComments;
    }
    //Add Comment 
    static add(userId, postId, content){
        const post = PostModel.getAll().find((p)=> p.id == postId);
        if (!post) {
            throw new ApplicationError("Post not found", 400);
        }
        if (!content) {
            throw new ApplicationError("Content not available for post", 400);
        }
        let newComment = new CommentModel(
            comments.length + 1,
            userId,
            postId,
            content
        );
        comments.push(newComment);
        return newComment;
    }
    // Update Comment of a Post
    static update(id, userId, content){
        // const post = PostModel.getAll().find((p)=> p.id == id);
        // if(!post){
        //     throw new ApplicationError("Post not found", 404);  
        // }

        const index = comments.findIndex((c)=> c.id == id);
        if(index == -1){
            throw new ApplicationError("Comment not found", 404);
        }
        if(comments[index].userId !== userId){
            throw new ApplicationError("You are not authorized to update this comment", 403);
        }

        if(!content) {
            throw new ApplicationError("Content is required for updating the comment", 400);
        }
        comments[index] = {...comments[index], content};
        return comments[index];
    }
    static remove(id, userId){
        const index = comments.findIndex((c)=> c.id == id && c.userId == userId);
        if(index == -1){
            throw new ApplicationError("Comment not found", 404);
        } else {
            comments.splice(index, 1);
        }

    }

}

var comments = [
    { id: 1, userId: 1, postId: 1, content: "Nice One"},
    { id: 2, userId: 2, postId: 1, content: "Keep it up"},
    { id: 3, userId: 1, postId: 2, content: "Good One"},
    { id: 4, userId: 2, postId: 2, content: "Good Luck"},
    { id: 5, userId: 1, postId: 3, content: "Delicious"},
    { id: 6, userId: 2, postId: 3, content: "Looks testy"},
]