import { Notifier } from ".";

export class TelegramNotifier implements Notifier {
  private BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY || "";
  private MY_CHANNEL_NAME = process.env.TELEGRAM_CHANNEL || "";

  async notify(data: Record<string, string>) {
    const gameNumber = Object.keys(data).length;
    if (gameNumber === 0) return;

    for (const key in data) {
      console.log(`Sending notification for ${key} - ${data[key]}`);
      await this.send(`Community copy available for ${key}`, data[key]);
    }
  }

  private async send(message: string, url: string) {
    const keyboard = {
      inline_keyboard: [[{ text: "Open on itch.io", url }]],
    };
    await fetch(
      `https://api.telegram.org/bot${this.BOT_API_KEY}/sendMessage?chat_id=${
        this.MY_CHANNEL_NAME
      }&text=${message}&reply_markup=${JSON.stringify(keyboard)}`
    );
  }
}
