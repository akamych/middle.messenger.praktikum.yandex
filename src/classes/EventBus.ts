// eslint-disable-next-line no-unused-vars
type eventFunction = (...args: unknown[]) => void;

export default class EventBus {
  private listeners: Record<string, eventFunction[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: eventFunction): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: eventFunction): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((previous) => previous !== callback);
  }

  emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((callback) => callback(...args));
  }
}
