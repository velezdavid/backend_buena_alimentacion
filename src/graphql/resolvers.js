const User = require("../microservices/auth/models/user");
const Comment = require("../microservices/commets/models/comment");

const resolvers = {
  Query: {
    comments: () => Comment.find().populate("userId"),
    comment: (_, { id }) => Comment.findById(id).populate("userId"),
    getCommentsByUser: (_, { userId }) =>
      Comment.find({ userId }).populate("userId"),
  },
  Comment: {
    user: async (parent) => {
      const user = await User.findById(parent.userId);
      return user;
    },
  },
  Mutation: {
    createComment: (_, { userId, recipeId, text }) =>
      Comment.create({ userId, recipeId, text }),
    updateComment: (_, { id, text }) =>
      Comment.findByIdAndUpdate(id, { text }, { new: true }).populate("userId"),
    deleteComment: (_, { id }) =>
      Comment.findByIdAndDelete(id).populate("userId"),
  },
};

module.exports = resolvers;
