export interface SocketState {
  socket: any;
}

export enum SocketActionType {
  SOCKET = "SOCKET",
}

export interface SocketttAction {
  type: typeof SocketActionType.SOCKET;
  payload: {
    socket: any;
  };
}

export type SocketAction = SocketttAction;
