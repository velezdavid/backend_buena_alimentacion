import { Router } from "express";
import {
  createComment,
  deleteCommentById,
  editComment,
  getAllComments,
} from "../controllers/commetController";

const routerComment = Router();

routerComment.post("/create", createComment);
routerComment.get("/list-comments/:recipeId", getAllComments);
routerComment.delete("/delete-comment/:commentId", deleteCommentById);
routerComment.put("/update-comment/:commentId", editComment);

export default routerComment;
