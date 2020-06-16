const resolvers = {
  User: {
    id(user) {
      return user._id;
    },

    posts(user, { lastCreatedAt, limit }, { User }) {
      return User.posts(user, { lastCreatedAt, limit });
    },

    likes(user, { lastCreatedAt, limit }, { User }) {
      return User.likes(user, { lastCreatedAt, limit });
    },

    comments(user, { lastCreatedAt, limit }, { User }) {
      return User.comments(user, { lastCreatedAt, limit });
    },

    files(user, { lastCreatedAt, limit }, { User }) {
      return User.files(user, { lastCreatedAt, limit });
    },
  },
  Query: {
    users(root, { lastCreatedAt, limit }, { User }) {
      return User.all({ lastCreatedAt, limit });
    },

    user(root, { id }, { User }) {
      return User.findOneById(id);
    },
  },
  Mutation: {
    async createUser(root, { input }, { User }) {
      const id = await User.insert(input);
      return User.findOneById(id);
    },

    async updateUser(root, { id, input }, { User }) {
      await User.updateById(id, input);
      return User.findOneById(id);
    },

    removeUser(root, { id }, { User }) {
      return User.removeById(id);
    },
  },
  Subscription: {
    userCreated: user => user,
    userUpdated: user => user,
    userRemoved: id => id,
  },
};

export default resolvers;
