const resolvers = {
  File: {
    id(file) {
      return file._id;
    },

    author(file, args, { File }) {
      return File.author(file);
    },

    post(file, args, { File }) {
      return File.post(file);
    },
  },
  Query: {
    files(root, { lastCreatedAt, limit }, { File }) {
      return File.all({ lastCreatedAt, limit });
    },

    file(root, { id }, { File }) {
      return File.findOneById(id);
    },
  },
  Mutation: {
    async createFile(root, { input }, { File }) {
      const id = await File.insert(input);
      return File.findOneById(id);
    },

    async updateFile(root, { id, input }, { File }) {
      await File.updateById(id, input);
      return File.findOneById(id);
    },

    removeFile(root, { id }, { File }) {
      return File.removeById(id);
    },
  },
  Subscription: {
    fileCreated: file => file,
    fileUpdated: file => file,
    fileRemoved: id => id,
  },
};

export default resolvers;
