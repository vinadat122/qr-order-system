// Minimal WebSocket abstraction to be used later for realtime features

type MessageHandler = (data: any) => void;

export class WSClient {
  private url: string;
  private socket: WebSocket | null = null;
  private handlers: Set<MessageHandler> = new Set();

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    if (this.socket) return;
    this.socket = new WebSocket(this.url);
    this.socket.onmessage = (ev) => {
      let data = null;
      try {
        data = JSON.parse(ev.data);
      } catch (e) {
        data = ev.data;
      }
      this.handlers.forEach((h) => h(data));
    };
    this.socket.onclose = () => {
      this.socket = null;
    };
  }

  onMessage(handler: MessageHandler) {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  send(msg: any) {
    if (!this.socket) this.connect();
    if (!this.socket) return;
    try {
      this.socket.send(typeof msg === "string" ? msg : JSON.stringify(msg));
    } catch (e) {
      console.error("WS send failed", e);
    }
  }

  disconnect() {
    if (!this.socket) return;
    this.socket.close();
    this.socket = null;
  }
}
