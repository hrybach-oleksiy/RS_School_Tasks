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
export interface User {
  login: string;
  password: string;
  isLogined?: boolean;
}
export interface UserStatus {
  login: string;
  isLogined?: boolean;
}
export interface MessageStatus {
  isDeleted?: boolean;
  isDelivered?: boolean;
  isReaded?: boolean;
  isEdited?: boolean;
}
export interface Message {
  id?: string;
  from?: string;
  to: string;
  text: string;
  datetime?: number;
  status?: MessageStatus;
}

export type PayloadType =
  | UserPayload
  | UserResponsePayload
  | UsersPayload
  | MessagePayload
  | MessageResponsePayload
  | MessagesPayload
  | UserStatus
  | ErrorPayload
  | null;
export interface ServerRequest {
  id: string | null;
  type: UserRequestType | MessageRequestType;
  payload: PayloadType;
}
export interface UserPayload {
  user: User;
}
export interface UserResponsePayload {
  user: UserStatus;
}
export interface UsersPayload {
  users: UserStatus[];
}
export interface UserMessagePayload {
  message: Message;
}
export interface MessagePayload {
  message: Message;
}
export interface MessagesPayload {
  messages: Message[];
}

export interface MessageResponsePayload {
  message: {
    id: string;
    text?: string;
    status?: MessageStatus;
  };
}
export interface ErrorPayload {
  error: string;
}
