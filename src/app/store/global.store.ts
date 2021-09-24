import { createStore, applyMiddleware, combineReducers, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { alertReducer } from "./alert/alert.reducer";
import { AlertState } from "./alert/alert.type";
import { userReducer } from "./user/user.reducer";
import { UserState } from "./user/user.type";

const rootReducer = combineReducers({
  alert: alertReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export interface GlobalState {
  alert: AlertState;
  user: UserState;
}

export type AppDispatch = ThunkDispatch<GlobalState, unknown, Action<string>>;

export type AppThunk = ThunkAction<
  Promise<void>,
  GlobalState,
  unknown,
  Action<string>
>;

export default store;
