import { Elysia } from "elysia";
import type { Constructor } from "../types";
import { MODULE_METADATA } from "./constants";
import { getControllerRoute } from "./controller";
import { getMethod, getRoute, type HttpMethod } from "./http-methods";
import type { ModuleMetadata } from "./module";
import { callControllerMethodWithParams } from "./params";

export class AppFactory {
  static create(target: any) {
    const moduleMetadata: ModuleMetadata = Reflect.getMetadata(
      MODULE_METADATA,
      target
    );

    const app = new Elysia();

    const controllers = handleControllers(moduleMetadata.controllers);

    for (const controller of controllers) {
      app[controller.httpMethod](controller.route, (request) => {
        return callControllerMethodWithParams(
          controller.controllerInstance,
          controller.methodName,
          request
        );
      });
    }

    return {
      listen: (port: number) => app.listen(port),
    };
  }
}

const handleControllers = (controllers: ModuleMetadata["controllers"]) => {
  if (!controllers) return [];

  const data: {
    controllerInstance: Constructor;
    route: string;
    httpMethod: Lowercase<HttpMethod>;
    method: any;
    methodName: string;
  }[] = [];

  for (const controller of controllers) {
    const controllerInstance = new controller();
    const controllerRoute = getControllerRoute(controller);
    const controllerMethods = Object.getOwnPropertyNames(controller.prototype);

    for (const controllerMethod of controllerMethods) {
      if (controllerMethod === "constructor") continue;

      const method = controllerInstance[controllerMethod];
      const route = getRoute(method);
      const httpMethod = getMethod(method);

      data.push({
        controllerInstance,
        route: `${controllerRoute}${route}`,
        httpMethod: httpMethod.toLowerCase() as Lowercase<HttpMethod>,
        method,
        methodName: controllerMethod,
      });
    }
  }

  return data;
};
