import { PostAction, PostActionType, PostState } from "./post.type";

const initialState: PostState = {
  posts: [],
};

export const postReducer = (
  state: PostState = initialState,
  action: PostAction
): PostState => {
  switch (action.type) {
    case PostActionType.CREATE_POST:
      return {
        ...state,
        posts: [action.payload.post, ...state.posts],
      };
    case PostActionType.GET_POSTS:
    case PostActionType.GET_USER_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
      };
    case PostActionType.GET_POST:
      const postList = state.posts.filter(
        post => post._id === action.payload.post._id
      );
      return {
        ...state,
        posts:
          postList.length > 0
            ? postList
            : action.payload.post
            ? [action.payload.post]
            : [],
      };
    case PostActionType.LIKE:
    case PostActionType.UNLIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.post._id ? action.payload.post : post
        ),
      };
    case PostActionType.GET_BOOKMARK_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
      };
    case PostActionType.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload.post._id),
      };
    case PostActionType.EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.post._id ? action.payload.post : post
        ),
      };

    default:
      return state;
  }
};
