export interface Notifier {
  notify(data: Record<string, string>): void;
}
