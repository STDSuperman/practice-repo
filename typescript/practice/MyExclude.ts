export type MyExclude<T, K extends T> = T extends K ? never : T;

type r = MyExclude<'a' | 'b', 'a'>;