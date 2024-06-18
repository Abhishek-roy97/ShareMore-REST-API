import express from "express";
import LikeController from "./likes.controller.js";

const likeRoutes = express.Router();
const likeController = new LikeController();

likeRoutes.post("/:id", likeController.toggleLikes);
likeRoutes.get("/:id", likeController.getAllLikes);

export default likeRoutes;
