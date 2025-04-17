import "reflect-metadata";
import { METHOD_METADATA, ROUTE_METADATA } from "../constants";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export function Get(path: string): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata(ROUTE_METADATA, path, descriptor.value!);
    Reflect.defineMetadata(METHOD_METADATA, "GET", descriptor.value!);
  };
}

export function Post(path: string): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata(ROUTE_METADATA, path, descriptor.value!);
    Reflect.defineMetadata(METHOD_METADATA, "POST", descriptor.value!);
  };
}

export function Put(path: string): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata(ROUTE_METADATA, path, descriptor.value!);
    Reflect.defineMetadata(METHOD_METADATA, "PUT", descriptor.value!);
  };
}

export function Delete(path: string): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata(ROUTE_METADATA, path, descriptor.value!);
    Reflect.defineMetadata(METHOD_METADATA, "DELETE", descriptor.value!);
  };
}

export function Patch(path: string): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata(ROUTE_METADATA, path, descriptor.value!);
    Reflect.defineMetadata(METHOD_METADATA, "PATCH", descriptor.value!);
  };
}

export function getRoute(target: any): string | undefined {
  const route = Reflect.getMetadata(ROUTE_METADATA, target);
  if (!route) return "/";
  return route.startsWith("/") ? route : `/${route}`;
}

export function getMethod(target: any): HttpMethod {
  const method = Reflect.getMetadata(METHOD_METADATA, target);
  return method ? method : "GET";
}
