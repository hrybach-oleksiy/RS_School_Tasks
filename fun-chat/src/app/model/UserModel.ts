import { UserRequestType, MessageRequestType } from '../../types/enums';
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

  // public loginExternalUser = (login: string): void => {
  //   const request: ServerRequest = {
  //     id: null,
  //     type: UserRequestType.EXTERNAL_LOGIN,
  //     payload: {
  //       user: {
  //         login,
  //         isLogined: true,
  //       },
  //     },
  //   };
  //   this.ws.send(JSON.stringify(request));
  // };

  // public logoutExternalUser = (login: string): void => {
  //   const request: ServerRequest = {
  //     id: null,
  //     type: UserRequestType.EXTERNAL_LOGOUT,
  //     payload: {
  //       user: {
  //         login,
  //         isLogined: false,
  //       },
  //     },
  //   };
  //   this.ws.send(JSON.stringify(request));
  // };

  public sendMessage = (receiver: string, text: string): void => {
    const request: ServerRequest = {
      id: null,
      type: MessageRequestType.SEND,
      payload: {
        message: {
          to: receiver,
          text,
        },
      },
    };
    this.ws.send(JSON.stringify(request));
  };

  public receiveMessage = (sender: string): void => {
    const request: ServerRequest = {
      id: null,
      type: MessageRequestType.FROM,
      payload: {
        user: {
          login: sender,
        },
      },
    };
    this.ws.send(JSON.stringify(request));
  };

  public removeMessage = (id: string): void => {
    console.log('remove message method works');
    const request: ServerRequest = {
      id: null,
      type: MessageRequestType.DELETE,
      payload: {
        message: {
          id,
        },
      },
    };
    this.ws.send(JSON.stringify(request));
  };

  public changeMessage = (id: string, text: string): void => {
    console.log('change message method works');
    const request: ServerRequest = {
      id: null,
      type: MessageRequestType.EDIT,
      payload: {
        message: {
          id,
          text,
        },
      },
    };
    this.ws.send(JSON.stringify(request));
  };
}
