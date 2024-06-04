import { Notifier } from ".";

export class N8NNotifier implements Notifier {
  private N8N_URL = process.env.N8N_NOTIFICATION_URL || "";
  async notify(data: Record<string, string>) {
    const gameNumber = Object.keys(data).length;
    if (gameNumber === 0) return;

    for (const key in data) {
      await this.send(`Community copy available for ${key}`, data[key]);
    }
  }

  private async send(message: string, url: string) {
    await fetch(this.N8N_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        url,
      }),
    });
  }
}
