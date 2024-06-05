import { Notifier } from "..";
import { ConsoleLogNotifier } from "../ConsoleLogNotifier";
import { N8NNotifier } from "../N8NNotifier";
import { TelegramNotifier } from "../TelegramNotifier";

const notifierTypes: Record<string, new () => Notifier> = {
  n8n: N8NNotifier,
  console: ConsoleLogNotifier,
  telegram: TelegramNotifier,
};

export class NotifierFactory {
  static createNotifier(type: string): Notifier {
    if (type in notifierTypes === false)
      throw new Error(`Notifier type ${type} not found`);

    return new notifierTypes[type]();
  }
}

const options = Object.keys(notifierTypes);

export { options };
