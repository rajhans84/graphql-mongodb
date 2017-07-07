import DataLoader from 'dataloader';
import findByIds from 'mongo-find-by-ids';

export default class Post {
  constructor(context) {
    this.context = context;
    this.collection = context.db.collection('post');
    this.pubsub = context.pubsub;
    this.loader = new DataLoader(ids => findByIds(this.collection, ids));
  }

  findOneById(id) {
    return this.loader.load(id);
  }

  all({ lastCreatedAt = 0, limit = 10 }) {
    return this.collection.find({
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  author(post) {
    return this.context.User.findOneById(post.authorId);
  }

  likes(post, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.Like.collection.find({
      postId: post._id,
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  comments(post, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.Comment.collection.find({
      postId: post._id,
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  files(post, { lastCreatedAt = 0, limit = 10 }) {
    return this.context.File.collection.find({
      _id: { $in: post.filesIds || [] },
      createdAt: { $gt: lastCreatedAt },
    }).sort({ createdAt: 1 }).limit(limit).toArray();
  }

  async insert(doc) {
    const docToInsert = Object.assign({}, doc, {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const id = (await this.collection.insertOne(docToInsert)).insertedId;
    this.pubsub.publish('postInserted', await this.findOneById(id));
    return id;
  }

  async updateById(id, doc) {
    const ret = await this.collection.update({ _id: id }, {
      $set: Object.assign({}, doc, {
        updatedAt: Date.now(),
      }),
    });
    this.loader.clear(id);
    this.pubsub.publish('postUpdated', await this.findOneById(id));
    return ret;
  }

  async removeById(id) {
    const ret = this.collection.remove({ _id: id });
    this.loader.clear(id);
    this.pubsub.publish('postRemoved', id);
    return ret;
  }
}
