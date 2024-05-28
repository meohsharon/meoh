type ID = string | number;
type IdName = {
  id: ID,
  name: string;
}

interface Dict<Type> {
  [key: string]: Type;
}