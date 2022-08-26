import { model, Schema, Types } from 'mongoose';

export interface IComment {
  content: string;
  user: Types.ObjectId;
}

interface ICommentDoc extends IComment, Document {}

const CommentSchema = new Schema<IComment>({
  content: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Comment = model<ICommentDoc>('Comment', CommentSchema);

export default Comment;
