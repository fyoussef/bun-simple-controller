import { getCommandHandlerCommand } from "@lib/cqrs/command-handler";
import type { Constructor } from "@lib/types";

export class CommandBus {
  private handlers = new Map<Constructor, any>();

  register(handlerClass: Constructor) {
    const commandClass = getCommandHandlerCommand(handlerClass);
    if (!commandClass) {
      throw new Error(
        `Class ${handlerClass.name} doesn't have @CommandHandler decorator`
      );
    }
    if (this.handlers.has(commandClass)) {
      throw new Error(`Handler ${commandClass.name} already registered`);
    }
    this.handlers.set(commandClass, new handlerClass());
  }

  async execute(command: any): Promise<any> {
    const commandClass = command.constructor;
    const handler = this.handlers.get(commandClass);
    if (!handler) {
      throw new Error(`Not found handler for command: ${command.name}`);
    }

    if (typeof handler.execute !== "function") {
      throw new Error(
        `Handler ${handler.constructor.name} doesn't implements méthod execute`
      );
    }

    return await handler.execute(command);
  }
}
