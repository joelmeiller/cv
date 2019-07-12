import { Mongo } from 'meteor/mongo';

export { CommentStatus } from './Status'

export const Comments = new Mongo.Collection('Comments');
