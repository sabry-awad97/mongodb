import {
  Document,
  Model,
  model,
  ObjectId,
  PopulatedDoc,
  Schema,
} from 'mongoose';
import { IComment } from './comment';

export interface IBlogPost {
  title: string;
  content: string;
  comments: PopulatedDoc<Document<ObjectId> & IComment>[];
}

interface IBlogPostDoc extends IBlogPost, Document {}
interface IBlogPostModel extends Model<IBlogPost> {}

const BlogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

const BlogPost = model<IBlogPostDoc, IBlogPostModel>(
  'BlogPost',
  BlogPostSchema
);

export default BlogPost;
