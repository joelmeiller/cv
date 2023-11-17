import { Comments, CommentStatus } from '../../collections/Comments'

export const updateComment = async function({ _id, text, close }) {
  await Comments.updateAsync({ _id }, { $set: {
    text,
    status: close ? CommentStatus.CLOSED : CommentStatus.OPEN,
    updatedAt: new Date(),
  } })
}