import { User } from "./user.type";
import { Comment } from "./comment.type";

export interface Post {
  content: string;
  images: string[];
  likes: User[];
  comments: Comment[];
  user: User;
  _id: string;
  createdAt: Date;
}
