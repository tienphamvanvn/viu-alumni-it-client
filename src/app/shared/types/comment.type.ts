import { User } from "./user.type";

export interface Comment {
  content: string;
  tag: User;
  reply: string;
  likes: User[];
  user: User;
  postId: string[];
  postUserId: string;
  _id: string;
  createdAt: Date;
}
