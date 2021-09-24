import { SocketAction, SocketActionType, SocketState } from "./socket.type";

const initialState: SocketState = {
  socket: null,
};

export const socketReducer = (
  state: SocketState = initialState,
  action: SocketAction
): SocketState => {
  switch (action.type) {
    case SocketActionType.SOCKET:
      return {
        ...state,
        socket: action.payload.socket,
      };

    default:
      return state;
  }
};
