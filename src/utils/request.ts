import { ApiPath, PickReq, PickRes, RequestMethods } from "@/api";
import { IS_NODE } from "./constance";

export async function request<P extends ApiPath, M extends RequestMethods>(
  input: P,
  init?: Omit<RequestInit, "query" | "method" | "body"> & {
    query?: PickReq<P, M>;
    body?: PickReq<P, M>;
    method: M;
  }
) {
  const { query, ...requestInit } = init || {};
  const baseUrl = IS_NODE
    ? `http://localhost:${process.env.PORT}`
    : window.location.origin;
  const requestPath = input.startsWith("/") ? input : `/${input}`;
  let queryString = "";
  if (query) {
    const params = new URLSearchParams();
    Object.keys(query).forEach((key) => {
      params.append(key, query[key as keyof typeof query] as any);
    });
    queryString = `?${params.toString()}`;
  }
  const requestUrl = `${baseUrl}${requestPath}${queryString}`;

  const res = await fetch(requestUrl, {
    ...(requestInit as any),
  });
  return (await res.json()) as PickRes<P, M>;
}
