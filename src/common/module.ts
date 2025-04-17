import "reflect-metadata";
import type { ArrayOfClasses } from "../types";
import { MODULE_METADATA } from "./constants";

export interface ModuleMetadata {
  controllers?: ArrayOfClasses;
}

export function Module(metadata: ModuleMetadata): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata(MODULE_METADATA, metadata, target);
  };
}
