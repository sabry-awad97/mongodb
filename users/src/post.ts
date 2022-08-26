import { Schema } from 'mongoose';

export interface IPost {
  title: string;
}

interface IPostSubDoc extends IPost, Document {}

const PostSchema = new Schema<IPostSubDoc>({
  title: {
    type: String,
  },
});

export default PostSchema;
