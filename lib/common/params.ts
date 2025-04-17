import "reflect-metadata";
import { PARAMS_METADATA } from "../constants";
import type { ControllerClass } from "./controller";

export enum ParamType {
  QUERY = "query",
  PARAM = "param",
  BODY = "body",
}

interface ParamMetadata {
  index: number; // índice do parâmetro no método
  type: ParamType; // tipo: query ou param
  key?: string; // chave opcional para buscar o valor, ex: 'id' ou 'userId'
}

export function createParamDecorator(type: ParamType) {
  return (key?: string): ParameterDecorator => {
    return (target, propertyKey, parameterIndex) => {
      const existingParams: ParamMetadata[] =
        Reflect.getOwnMetadata(PARAMS_METADATA, target, propertyKey!) || [];

      existingParams.push({
        index: parameterIndex,
        type,
        key,
      });

      Reflect.defineMetadata(
        PARAMS_METADATA,
        existingParams,
        target,
        propertyKey!
      );
    };
  };
}

export const Query = createParamDecorator(ParamType.QUERY);

export const Param = createParamDecorator(ParamType.PARAM);

export const Body = createParamDecorator(ParamType.BODY);

export function getMethodParamsMetadata(
  target: ControllerClass,
  methodName: string
) {
  const params: ParamMetadata[] =
    Reflect.getOwnMetadata(PARAMS_METADATA, target, methodName) || [];

  return params;
}

export function callControllerMethodWithParams(
  controller: any,
  methodName: string,
  req: any
) {
  const paramsMetadata = getMethodParamsMetadata(
    controller.constructor.prototype,
    methodName
  );
  const args = [];

  for (const param of paramsMetadata) {
    let value;
    if (param.type === ParamType.PARAM) {
      value = param.key ? req.params[param.key] : req.params;
    } else if (param.type === ParamType.QUERY) {
      value = param.key ? req.query[param.key] : req.query;
    } else if (param.type === ParamType.BODY) {
      value = param.key ? req.body[param.key] : req.body;
    }
    args[param.index] = value;
  }

  return controller[methodName](...args);
}
