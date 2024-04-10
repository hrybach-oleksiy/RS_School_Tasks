// import BaseComponent from '../app/components/BaseComponent';

import { UserRequestType } from './enums';

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
  callback: () => void;
}

export type PayloadType =
  | UserLoginPayload
  | UserLoginResponsePayload
  | UserLoginErrorPayload
  | GetAllUsersPayload
  | null;
export interface ServerRequest {
  id: string | null;
  type: UserRequestType;
  payload: PayloadType;
}

export interface UserLoginPayload {
  user: UserLoginData;
}

export interface UserLoginResponsePayload {
  user: {
    login: string;
    isLogined: boolean;
  };
}

export interface GetAllUsersPayload {
  users: UserLoginResponsePayload[];
}

export interface UserLoginErrorPayload {
  error: string;
}

export interface UserLoginData {
  login: string;
  password: string;
}

export interface UserData {
  login: string;
  password: string;
  isLogined?: boolean;
}
