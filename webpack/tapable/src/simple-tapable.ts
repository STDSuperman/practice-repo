type ITask = (...args: unknown[]) => void;

export class SyncHook{
  public taps: ITask[] = []

  constructor(public args: unknown[]) {}

  // 订阅
  tap(name: string, fn: ITask) {
    this.taps.push(fn);
  }

  // 执行
  call(...args: unknown[]){
    this.taps.forEach(tap => tap(...args));
  }
}