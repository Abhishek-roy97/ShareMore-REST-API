import PostModel from "../posts/post.model.js";
import ApplicationError from "../../middlewares/application.error.middleware.js";

export default class LikeModel{
    constructor(id, userId, postId){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }
    //Toggle Like Feature
    static toggle(userId, postId){
        const postExist = PostModel.getAll().find((p)=> p.id == postId);
        if(!postExist){
            throw new ApplicationError("Post not found for the given Id", 404); 
        }
        const postLiked = likes.findIndex((l)=> l.userId == userId && l.postId == postId);
        if(postLiked !== -1){
            likes.splice(postLiked, 1);
            return { liked: false };
        }else{
            const likeId = likes.length > 0 ? likes[likes.length - 1].id + 1 : 1;
            const newLike = new LikeModel(likeId, userId, postId);
            likes.push(newLike);
            return { liked: true };
        }
    }
        //Get Likes of Post
        static get(postId) {
            const like = likes.filter((l)=> l.postId == postId);
            if(like.length === 0){
                throw new ApplicationError("No likes found for the Post", 404);
            }
            return like;
        }
    }


var likes = [];