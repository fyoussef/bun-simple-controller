export type Constructor<T = any> = new (...args: any[]) => T;
export type ArrayOfClasses<T = any> = Constructor<T>[];
