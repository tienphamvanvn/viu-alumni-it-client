import { createStore, applyMiddleware, combineReducers, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { alertReducer } from "./alert/alert.reducer";
import { AlertState } from "./alert/alert.type";
import { notifyReducer } from "./notify/notify.reducer";
import { NotifyState } from "./notify/notify.type";
import { postReducer } from "./post/post.reducer";
import { PostState } from "./post/post.type";
import { socketReducer } from "./socket/socket.reducer";
import { SocketState } from "./socket/socket.type";
import { userReducer } from "./user/user.reducer";
import { UserState } from "./user/user.type";

const rootReducer = combineReducers({
  alert: alertReducer,
  user: userReducer,
  socket: socketReducer,
  notify: notifyReducer,
  post: postReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export interface GlobalState {
  alert: AlertState;
  user: UserState;
  socket: SocketState;
  notify: NotifyState;
  post: PostState;
}

export type AppDispatch = ThunkDispatch<GlobalState, unknown, Action<string>>;

export type AppThunk = ThunkAction<
  Promise<void>,
  GlobalState,
  unknown,
  Action<string>
>;

export default store;
