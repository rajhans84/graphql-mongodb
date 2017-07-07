import { ObjectId } from 'mongodb';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { merge } from 'lodash';

const resolvers = {};

resolvers.ObjID = new GraphQLScalarType({
  name: 'ObjID',
  description: 'Id representation, based on Mongo Object Ids',
  parseValue(value) {
    return ObjectId(value);
  },
  serialize(value) {
    return value.toString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ObjectId(ast.value);
    }
    return null;
  },
});

export default resolvers;

import userResolvers from './User';
merge(resolvers, userResolvers);

import fileResolvers from './File';
merge(resolvers, fileResolvers);

import postResolvers from './Post';
merge(resolvers, postResolvers);

import commentResolvers from './Comment';
merge(resolvers, commentResolvers);

import likeResolvers from './Like';
merge(resolvers, likeResolvers);
