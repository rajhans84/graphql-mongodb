const resolvers = {
  Comment: {
    id(comment) {
      return comment._id;
    },

    author(comment, args, { Comment }) {
      return Comment.author(comment);
    },

    post(comment, args, { Comment }) {
      return Comment.post(comment);
    },
  },
  Query: {
    comments(root, { lastCreatedAt, limit }, { Comment }) {
      return Comment.all({ lastCreatedAt, limit });
    },

    comment(root, { id }, { Comment }) {
      return Comment.findOneById(id);
    },
  },
  Mutation: {
    async createComment(root, { input }, { Comment }) {
      const id = await Comment.insert(input);
      return Comment.findOneById(id);
    },

    async updateComment(root, { id, input }, { Comment }) {
      await Comment.updateById(id, input);
      return Comment.findOneById(id);
    },

    removeComment(root, { id }, { Comment }) {
      return Comment.removeById(id);
    },
  },
  Subscription: {
    commentCreated: comment => comment,
    commentUpdated: comment => comment,
    commentRemoved: id => id,
  },
};

export default resolvers;
