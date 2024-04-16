// import BaseComponent from '../app/components/BaseComponent';

import { UserRequestType, MessageRequestType } from './enums';

export interface InputProps {
  classNames?: string[];
  id: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: string;
  checked?: string;
  onChange?: EventListener;
}

export interface RoutesPath {
  path: string;
  render: () => void;
}

export interface UserLoginData {
  login: string;
  password?: string;
}

export interface MessageStatusData {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
}

export interface UserData {
  login: string;
  password: string;
  isLogined?: boolean;
}

export interface MessageData {
  id?: string;
  from?: string;
  to: string;
  text: string;
  datetime?: number;
  status?: MessageStatusData;
}

export type PayloadType =
  | UserLoginPayload
  | UserLoginResponsePayload
  | UsersPayload
  | MessagePayload
  | MessageFromPayload
  | MessageDeletePayload
  | MessageDeleteResponsePayload
  | MessageEditResponsePayload
  | MessagesPayload
  | ErrorPayload
  | null;
export interface ServerRequest {
  id: string | null;
  type: UserRequestType | MessageRequestType;
  payload: PayloadType;
}

export interface UserLoginPayload {
  user: UserLoginData;
}

export interface UserLoginResponsePayload {
  user: {
    login: string;
    isLogined?: boolean;
  };
}

export interface UsersPayload {
  users: {
    login: string;
    isLogined: boolean;
  }[];
}

export interface ErrorPayload {
  error: string;
}

export interface UserMessagePayload {
  message: {
    id: string;
    to: string;
    text: string;
  };
}
export interface MessagePayload {
  message: MessageData;
}

export interface MessagesPayload {
  messages: MessageData[];
}

export interface MessageFromPayload {
  user: {
    login: string;
  };
}

export interface MessageDeletePayload {
  message: {
    id: string;
  };
}

export interface MessageDeleteResponsePayload {
  message: {
    id: string;
    status?: {
      isDeleted: boolean;
    };
  };
}

export interface MessageEditResponsePayload {
  message: {
    id: string;
    text?: string;
    status?: {
      isEdited: boolean;
    };
  };
}

// type SomeType = {
//   a: string;
//   b: string;
//   c: string;
//   d: string;
// };

// type OmitType1 = {
//   to: string;
//   text: string;
// };

// type OmitType2 = {
//   c: string;
//   d: string;
// };

// type OmittedType1 = Omit<MessagePayload, keyof OmitType1>;
// type OmittedType2 = Omit<SomeType, keyof OmitType2>;
