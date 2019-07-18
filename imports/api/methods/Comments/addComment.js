import { Comments, CommentStatus } from '../../collections/Comments'

export const addComment = function({ text, position, contentId }) {
  Comments.insert({
    text,
    position,
    contentId,
    userId: this.userId,
    status: CommentStatus.OPEN,
    createdAt: new Date(),
  })
}
