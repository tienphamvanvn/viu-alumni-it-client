import { User } from "./user.type";

export interface Notify {
  uId: string;
  user: User;
  recipients: string[];
  url: string;
  text: string;
  content: string;
  image: string;
  isRead: boolean;
  type: string;
  _id: string;
  createdAt: Date;
}

export interface NotifyProps {
  uId: string;
  text: string;
  recipients: string[];
  url: string;
  type: string;
}
