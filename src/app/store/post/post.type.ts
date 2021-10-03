import { Post } from "@/app/shared/types/post.type";

export interface PostState {
  isLoading: boolean;
  isLoadingCreate: boolean;
  isLoadingEdit: boolean;
  posts: Post[];
}

export enum PostActionType {
  POST_LOADING = "POST_LOADING",
  POST_CREATE_LOADING = "POST_CREATE_LOADING",
  POST_EDIT_LOADING = "POST_EDIT_LOADING",
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

export interface PostLoading {
  type: typeof PostActionType.POST_LOADING;
  payload: {
    isLoading: boolean;
  };
}

export interface PostCreateLoading {
  type: typeof PostActionType.POST_CREATE_LOADING;
  payload: {
    isLoadingCreate: boolean;
  };
}

export interface PostEditLoading {
  type: typeof PostActionType.POST_EDIT_LOADING;
  payload: {
    isLoadingEdit: boolean;
  };
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
  | PostLoading
  | PostCreateLoading
  | PostEditLoading
  | CreatePostAction
  | GetPostsAction
  | GetPostAction
  | LikeAction
  | UnlikeAction
  | GetUserPostsAction
  | GetBookmarkPostsAction
  | DeletePostAction
  | EditPostAction;
