import "reflect-metadata";
import { MODULE_METADATA } from "../constants";
import type { ArrayOfClasses } from "../types";

export interface ModuleMetadata {
  controllers?: ArrayOfClasses;
}

export function Module(metadata: ModuleMetadata): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata(MODULE_METADATA, metadata, target);
  };
}
