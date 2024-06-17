import express from 'express';
import PostController from "./post.controller.js";
import { uploadFile } from "../../middlewares/file-upload.middleware.js"

const postRouter = express.Router();
const postController = new PostController();

postRouter.get("/filter", postController.filterPosts);
postRouter.get('/all',postController.getAllPost);
postRouter.post('/',uploadFile.single("imageUrl"),postController.createPost);
postRouter.get('/:id',postController.getPostById);
postRouter.get('/',postController.getPostByUserId);
postRouter.put('/:id',uploadFile.single("imageUrl"),postController.updatePost);
postRouter.delete('/:id',postController.deletePost);
postRouter.post('/:postId/save',postController.savePosts);
postRouter.put('/:postId/archive',postController.archivePosts);
postRouter.post('/:postId/bookmark',postController.bookmarkPost);

export default postRouter;
