import { createStore, applyMiddleware, combineReducers, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

const rootReducer = combineReducers({});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export interface GlobalState {}

export type AppDispatch = ThunkDispatch<GlobalState, unknown, Action<string>>;

export type AppThunk = ThunkAction<
  Promise<void>,
  GlobalState,
  unknown,
  Action<string>
>;

export default store;
