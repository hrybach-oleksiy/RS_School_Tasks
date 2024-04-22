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
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
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
  // | MessagesResponsePayload
  // | MessageFromPayload
  | MessageDeletePayload
  | MessageDeleteResponsePayload
  | MessageEditResponsePayload
  | MessageDeliverResponsePayload
  | MessageReadResponsePayload
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
  message: {
    id: string;
    to: string;
    text: string;
  };
}
export interface MessagePayload {
  message: Message;
}

export interface MessagesPayload {
  messages: Message[];
}

// export interface MessagesResponsePayload {
//   message: Message;
// }

// export interface MessageFromPayload {
//   user: {
//     login: string;
//   };
// }
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

export interface MessageDeliverResponsePayload {
  message: {
    id: string;
    status?: {
      isDelivered: boolean;
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

export interface MessageReadResponsePayload {
  message: {
    id: string;
    status?: {
      isReaded: boolean;
    };
  };
}

export interface ErrorPayload {
  error: string;
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
