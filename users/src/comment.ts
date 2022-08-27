import { model, Document , ObjectId, PopulatedDoc, Schema, Types } from 'mongoose';
import { IUser } from './user';

export interface IComment {
  content: string;
  user: PopulatedDoc<Document<ObjectId> & IUser>;
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
