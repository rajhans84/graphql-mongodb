const models = {};

export default function addModelsToContext(context) {
  const newContext = Object.assign({}, context);
  Object.keys(models).forEach((key) => {
    newContext[key] = new models[key](newContext);
  });
  return newContext;
}

import User from './User';
models.User = User;

import File from './File';
models.File = File;

import Post from './Post';
models.Post = Post;

import Comment from './Comment';
models.Comment = Comment;

import Like from './Like';
models.Like = Like;
