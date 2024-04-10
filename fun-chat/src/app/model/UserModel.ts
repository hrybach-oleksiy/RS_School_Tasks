import { UserRequestType } from '../../types/enums';
import { ServerRequest } from '../../types/interfaces';

export default class UserModel {
  private ws: WebSocket;

  constructor(ws: WebSocket) {
    this.ws = ws;
  }

  public loginUser = (login: string, password: string): void => {
    const request: ServerRequest = {
      id: null,
      type: UserRequestType.LOGIN,
      payload: {
        user: {
          login,
          password,
        },
      },
    };

    this.ws.send(JSON.stringify(request));
  };

  public logoutUser = (login: string, password: string): void => {
    const request: ServerRequest = {
      id: null,
      type: UserRequestType.LOGOUT,
      payload: {
        user: {
          login,
          password,
        },
      },
    };

    this.ws.send(JSON.stringify(request));
  };

  public getActiveUser = (): void => {
    const request: ServerRequest = {
      id: null,
      type: UserRequestType.ACTIVE,
      payload: null,
    };

    this.ws.send(JSON.stringify(request));
  };

  public getInActiveUser = (): void => {
    const request: ServerRequest = {
      id: null,
      type: UserRequestType.INACTIVE,
      payload: null,
    };

    this.ws.send(JSON.stringify(request));
  };
}
