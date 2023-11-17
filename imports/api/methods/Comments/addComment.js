import { Comments, CommentStatus } from '../../collections/Comments'

export const addComment = async function({ text, position, contentId }) {
  await Comments.insertAsync({
    text,
    position,
    contentId,
    userId: this.userId,
    status: CommentStatus.OPEN,
    createdAt: new Date(),
  })
}
