import "reflect-metadata";
import { CONTROLLER_METADATA } from "./constants";

export type ControllerClass = {
  new (...args: any[]): any; // construtor
  __isController?: true;
};

export function Controller(route: string): ClassDecorator {
  return function (target: any) {
    target.__isController = true;
    Reflect.defineMetadata(
      CONTROLLER_METADATA,
      route.startsWith("/") ? route : "/" + route,
      target
    );
  };
}

export function getControllerRoute(target: any): string | undefined {
  const route = Reflect.getMetadata(CONTROLLER_METADATA, target);
  if (!route) return "/";
  return route.startsWith("/") ? route : `/${route}`;
}
