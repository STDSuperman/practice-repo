interface Vip {
  vip: string;
}

interface BigMember {
  member: string;
}

type WithoutType<T extends {}, U extends {}> = {
  [P in Exclude<keyof T, keyof U>]?: never;
}

type XOR<T extends {}, U extends {}> = (WithoutType<T, U> & U) | (WithoutType<U, T> & T)

type Result = XOR<Vip, BigMember>;

const ex: Result = {
  // vip: 'vip',
  member: ''
}
