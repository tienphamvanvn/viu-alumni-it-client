import { Post } from "@/app/shared/types/post.type";

export interface PostState {
  posts: Post[];
}

export enum PostActionType {
  CREATE_POST = "CREATE_POST",
  GET_POSTS = "GET_POSTS",
  GET_POST = "GET_POST",
  LIKE = "LIKE",
  UNLIKE = "UNLIKE",
  GET_USER_POSTS = "GET_USER_POSTS",
  GET_BOOKMARK_POSTS = "GET_BOOKMARK_POSTS",
  DELETE_POST = "DELETE_POST",
  EDIT_POST = "EDIT_POST",
}

export interface CreatePostAction {
  type: typeof PostActionType.CREATE_POST;
  payload: {
    post: Post;
  };
}

export interface GetPostsAction {
  type: typeof PostActionType.GET_POSTS;
  payload: {
    posts: Post[];
  };
}

export interface GetPostAction {
  type: typeof PostActionType.GET_POST;
  payload: {
    post: Post;
    posts: Post[];
  };
}

export interface LikeAction {
  type: typeof PostActionType.LIKE;
  payload: {
    post: Post;
    posts: Post[];
  };
}

export interface UnlikeAction {
  type: typeof PostActionType.UNLIKE;
  payload: {
    post: Post;
    posts: Post[];
  };
}

export interface GetUserPostsAction {
  type: typeof PostActionType.GET_USER_POSTS;
  payload: {
    posts: Post[];
  };
}

export interface GetBookmarkPostsAction {
  type: typeof PostActionType.GET_BOOKMARK_POSTS;
  payload: {
    posts: Post[];
  };
}

export interface DeletePostAction {
  type: typeof PostActionType.DELETE_POST;
  payload: {
    post: Post;
  };
}

export interface EditPostAction {
  type: typeof PostActionType.EDIT_POST;
  payload: {
    post: Post;
  };
}

export type PostAction =
  | CreatePostAction
  | GetPostsAction
  | GetPostAction
  | LikeAction
  | UnlikeAction
  | GetUserPostsAction
  | GetBookmarkPostsAction
  | DeletePostAction
  | EditPostAction;
