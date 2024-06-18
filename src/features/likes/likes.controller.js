import LikeModel from "./likes.model.js";

export default class LikeController {
    //Toggle Like for a Post
    toggleLikes(req, res, next){
        try{
            const postId = req.params.id;
            const userId = req.userId;
            const newLike = LikeModel.toggle(userId, postId);
            res.status(201).json(newLike);
        }catch(error){
            next(error);
        }
    }
    getAllLikes(req, res, next){
        try{
            const postId = req.params.id;
            const likes = LikeModel.get(postId);
            res.status(200).json(likes);
        }catch(error){
            next(error);
        }
    }
}