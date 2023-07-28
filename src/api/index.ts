import { HomeApi } from "./home";

export type Api = HomeApi;

export type ApiPath = keyof Api;
export type RequestMethods = keyof Api[ApiPath];

export type PickRes<
  P extends ApiPath,
  M extends RequestMethods
> = Api[P][M]["res"];

export type PickReq<
  P extends ApiPath,
  M extends RequestMethods
> = Api[P][M]["req"];

export * from "./home";
