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
  ERROR = 'ERROR',
}

export { LinkAttribute, ImageAttribute, FormAttribute, UserRequestType };
