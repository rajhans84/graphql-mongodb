const resolvers = {
  Post: {
    id(post) {
      return post._id;
    },

    author(post, args, { Post }) {
      return Post.author(post);
    },

    likes(post, { lastCreatedAt, limit }, { Post }) {
      return Post.likes(post, { lastCreatedAt, limit });
    },

    comments(post, { lastCreatedAt, limit }, { Post }) {
      return Post.comments(post, { lastCreatedAt, limit });
    },

    files(post, { lastCreatedAt, limit }, { Post }) {
      return Post.files(post, { lastCreatedAt, limit });
    },
  },
  Query: {
    posts(root, { lastCreatedAt, limit }, { Post }) {
      return Post.all({ lastCreatedAt, limit });
    },

    post(root, { id }, { Post }) {
      return Post.findOneById(id);
    },
  },
  Mutation: {
    async createPost(root, { input }, { Post }) {
      const id = await Post.insert(input);
      return Post.findOneById(id);
    },

    async updatePost(root, { id, input }, { Post }) {
      await Post.updateById(id, input);
      return Post.findOneById(id);
    },

    removePost(root, { id }, { Post }) {
      return Post.removeById(id);
    },
  },
  Subscription: {
    postCreated: post => post,
    postUpdated: post => post,
    postRemoved: id => id,
  },
};

export default resolvers;
