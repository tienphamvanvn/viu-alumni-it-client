import { createStore, applyMiddleware, combineReducers, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { alertReducer } from "./alert/alert.reducer";
import { AlertState } from "./alert/alert.type";
import { socketReducer } from "./socket/socket.reducer";
import { SocketState } from "./socket/socket.type";
import { userReducer } from "./user/user.reducer";
import { UserState } from "./user/user.type";

const rootReducer = combineReducers({
  alert: alertReducer,
  user: userReducer,
  socket: socketReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export interface GlobalState {
  alert: AlertState;
  user: UserState;
  socket: SocketState;
}

export type AppDispatch = ThunkDispatch<GlobalState, unknown, Action<string>>;

export type AppThunk = ThunkAction<
  Promise<void>,
  GlobalState,
  unknown,
  Action<string>
>;

export default store;
