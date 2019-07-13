import { Comments, CommentStatus } from '../../collections/Comments'

export const addComment = function({ text, position }) {
  Comments.insert({
    text,
    position,
    userId: this.userId,
    status: CommentStatus.OPEN,
    createdAt: new Date(),
  })
}
