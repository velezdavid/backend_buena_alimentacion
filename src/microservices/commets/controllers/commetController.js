const Comment = require("../models/comment");

export const createComment = async (req, res) => {
  try {
    const { recipeId, userId, text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Campos vacios" });
    }

    const comment = await Comment.create({ recipeId, userId, text });

    await comment.populate("userId");

    return res.status(201).json({ message: "Comentario realizado", comment });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getAllComments = async (req, res) => {
  const { recipeId } = req.params;
  try {
    const comments = await Comment.find({ recipeId }).populate("userId");
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los comentarios", error });
  }
};

export const deleteCommentById = async (req, res) => {
  const { commentId } = req.params;
  try {
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el comentario", error });
  }
};

export const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );
    await comment.populate("userId");

    res.status(200).json({ message: "Se ha editado el comentario", comment });
  } catch (error) {
    res.status(500).json({ message: "Error al editar el comentario", error });
  }
};
