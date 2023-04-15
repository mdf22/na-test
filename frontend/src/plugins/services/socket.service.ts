
export interface ISocketClient {
	onopen: Function;
	onmessage: Function;
	onclose: Function;
	onerror: Function;
}

export class SocketService {
	socket: WebSocket;
	client: ISocketClient;
	constructor() {
		this.socket = new WebSocket('ws://localhost:4000',[
			"protocolOne"
		]);

		this.socket.onopen = (e) => {
			if (typeof this.client.onopen == 'function') {
				this.client.onopen(e);
			}
		};
		this.socket.onmessage = (event) => {
			if (typeof this.client.onmessage == 'function') {
				this.client.onmessage(event);
			}
		};
		this.socket.onclose = (event) => {
			if (typeof this.client.onclose == 'function') {
				this.client.onclose(event);
			}
		};
		this.socket.onerror = (event) => {
			if (typeof this.client.onerror == 'function') {
				this.client.onerror(event);
			}
		};
	}

	connect(message: string, client: ISocketClient) {
		this.client = client;
	}
	send(message:string) {
		this.socket.send(message);
	}
}
