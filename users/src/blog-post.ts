import { model, Schema, Types } from 'mongoose';

export interface IBlogPost {
  title: string;
  content: string;
  comments: Types.ObjectId;
}

interface IBlogPostDoc extends IBlogPost, Document {}

const BlogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  comments: { type: Schema.Types.ObjectId, ref: 'Comment' },
});

const BlogPost = model<IBlogPostDoc>('BlogPost', BlogPostSchema);

export default BlogPost;
