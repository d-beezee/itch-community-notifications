import { Notifier } from ".";

export class ConsoleLogNotifier implements Notifier {
  async notify(data: Record<string, string>) {
    const gameNumber = Object.keys(data).length;
    if (gameNumber === 0) return;

    let message = "";
    if (gameNumber === 1) message = "There is 1 game available:\n";
    else message = `There are ${gameNumber} games available:\n`;

    for (const key in data) {
      message += ` - [${key}] available at ${data[key]}\n`;
    }
    console.log(message);
  }
}
