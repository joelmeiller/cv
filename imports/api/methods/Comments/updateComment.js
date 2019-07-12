import { Comments, CommentStatus } from '../../collections/Comments'

export const updateComment = function({ _id, text, close }) {
  console.log('UPDATE COMMENT', _id, text)
  Comments.update({ _id }, { $set: {
    text,
    status: close ? CommentStatus.CLOSED : CommentStatus.OPEN,
    updatedAt: new Date(),
  } })
}