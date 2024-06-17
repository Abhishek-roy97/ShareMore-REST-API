import ApplicationError from "../../middlewares/application.error.middleware.js";
import PostModel from "./post.model.js";

export default class PostController {
  //Get All Post
  getAllPost(req, res, next) {
    try {
      const posts = PostModel.getAll();
      res.status(200).send(posts);
    } catch (error) {
      next(error);
    }
  }
  //Create New Post
  createPost(req, res){
    
    const userId = req.userId;
    //console.log(userId);
    const { caption } = req.body;
    const imageUrl = req.file.filename;
    
    let newPost = PostModel.add(userId, caption, imageUrl);
    res.status(201).send(newPost);
    // console.log(newPost);
  }
  //Get Post by Id
  getPostById(req, res, next){
    try {
        const id = req.params.id;
        let post = PostModel.getById(id)
        res.status(200).send(post);
    } catch (error) {
        next(error);
    }
  }
  // Get User's Posts by userId
  getPostByUserId(req, res){
    const userId = req.userId;
    let userPost = PostModel.getUserPost(userId);
    res.status(200).send(userPost);
  }
  //Update Post
  updatePost(req, res, next){
    const id = req.params.id;
    const userId = req.userId;
    const { caption } = req.body;
    const imageUrl = req.file.filename;
    try {
      const updatedPost = PostModel.update(id, userId, caption, imageUrl);
      res.status(200).send(updatedPost);
    } catch (error) {
      next(error);
    }
  }
  //Delete Post
  deletePost(req, res, next){
    const postId = req.params.id;
    const userId = req.userId;
    try {
      PostModel.remove(postId, userId);
      return res.status(200).send("Post is deleted");
    } catch (error) {
      next(error);
    }
  }
  //Filter Post by Caption
  filterPosts(req, res, next){
    try {
      const caption = req.query.caption;
      console.log("Filtering by caption:", caption);
      const filteredPosts = PostModel.getByCaption(caption);
      console.log("Filtered posts:", filteredPosts);
      res.status(200).json(filteredPosts);
    } catch (error) {
      next(error);
    }
  }
  savePosts(req, res, next){
    const postId = req.params.postId;
    try {
      const userId = req.userId;
      PostModel.save(postId, userId);
      res.status(201).send("Post saved successfully");
    } catch (error) {
      next(error);
    }
  }
  archivePosts(req, res, next){
    const postId = req.params.postId;
    try {
      PostModel.archivePost(postId);
      res.status(201).send("Post archived successfully");
    }catch(error){
      next(error);
    }

  }
  bookmarkPost(req, res, next){
    const postId = req.params.postId;
    const userId = req.userId;
    try{
      PostModel.bookMark(postId, userId);
      res.status(200).send("Post Bookmarked");
    } catch(error){
      next(error);
    }
  }
} 