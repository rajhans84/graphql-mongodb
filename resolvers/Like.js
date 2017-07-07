const resolvers = {
  Like: {
    id(like) {
      return like._id;
    },

    author(like, args, { Like }) {
      return Like.author(like);
    },

    post(like, args, { Like }) {
      return Like.post(like);
    },
  },
  Query: {
    likes(root, { lastCreatedAt, limit }, { Like }) {
      return Like.all({ lastCreatedAt, limit });
    },

    like(root, { id }, { Like }) {
      return Like.findOneById(id);
    },
  },
  Mutation: {
    async createLike(root, { input }, { Like }) {
      const id = await Like.insert(input);
      return Like.findOneById(id);
    },

    async updateLike(root, { id, input }, { Like }) {
      await Like.updateById(id, input);
      return Like.findOneById(id);
    },

    removeLike(root, { id }, { Like }) {
      return Like.removeById(id);
    },
  },
  Subscription: {
    likeCreated: like => like,
    likeUpdated: like => like,
    likeRemoved: id => id,
  },
};

export default resolvers;
