/**
 * 声明挂载于全局对象上的类型
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
    }
  }
}

export {};
