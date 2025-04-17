import { COMMAND_HANDLER_METADATA } from "@lib/constants";
import type { Constructor } from "@lib/types";

export function CommandHandler(command: Constructor): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(COMMAND_HANDLER_METADATA, command, target);
  };
}

export function getCommandHandlerCommand(
  handler: Constructor
): Constructor | undefined {
  return Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler);
}
