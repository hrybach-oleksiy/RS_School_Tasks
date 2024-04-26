enum Endpoint {
  GARAGE = 'garage',
  ENGINE = 'engine',
  WINNERS = 'winners',
}

enum HTTPMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT',
  POST = 'POST',
  PATCH = 'PATCH',
}

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

export { Endpoint, LinkAttribute, ImageAttribute, FormAttribute, HTTPMethod };
