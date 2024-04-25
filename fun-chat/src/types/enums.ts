enum FormAttribute {
  PLACEHOLDER = 'placeholder',
  TYPE = 'type',
  NAME = 'name',
  ID = 'id',
  FOR = 'for',
  REQUIRED = 'required',
  ACTION = 'action',
  DISABLED = 'disabled',
  CHECKED = 'checked',
  VALUE = 'value',
  SELECTED = 'selected',
}

enum ImageAttribute {
  SRC = 'src',
  ALT = 'alt',
}

enum LinkAttribute {
  HREF = 'href',
  TARGET = 'target',
}

enum UserRequestType {
  LOGIN = 'USER_LOGIN',
  LOGOUT = 'USER_LOGOUT',
  ACTIVE = 'USER_ACTIVE',
  INACTIVE = 'USER_INACTIVE',
  EXTERNAL_LOGIN = 'USER_EXTERNAL_LOGIN',
  EXTERNAL_LOGOUT = 'USER_EXTERNAL_LOGOUT',
  ERROR = 'ERROR',
}

enum MessageRequestType {
  SEND = 'MSG_SEND',
  FROM = 'MSG_FROM_USER',
  READ = 'MSG_READ',
  DELETE = 'MSG_DELETE',
  EDIT = 'MSG_EDIT',
  DELIVER = 'MSG_DELIVER',
}

enum RouteHash {
  LOGIN = 'login',
  CHAT = 'chat',
  ABOUT = 'about',
  NOT_FOUND = '404',
  ROOT = '/',
}

export { LinkAttribute, ImageAttribute, FormAttribute, UserRequestType, MessageRequestType, RouteHash };
