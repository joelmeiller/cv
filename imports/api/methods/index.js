import { Meteor } from 'meteor/meteor'

import { addComment } from './Comments/addComment'
import { updateComment } from './Comments/updateComment'

export const Method = {
  addComment: 'Comments.add',
  updateComment: 'Comments.update',
}

Meteor.methods({
  [Method.addComment]: addComment,
  [Method.updateComment]: updateComment,
});