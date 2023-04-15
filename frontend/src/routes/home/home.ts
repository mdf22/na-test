import {LifecycleFlags} from 'aurelia'
import {IHydratedController} from '@aurelia/runtime-html'
import {ApiService} from '../../plugins/services/api.service'
import {ISocketClient, SocketService} from '../../plugins/services/socket.service'
import {newInstanceOf} from '@aurelia/kernel'
import {RDM_Device} from './RDM_Device'
export class Home implements ISocketClient {

	data: RDM_Device[] = [];
	constructor(private readonly api: ApiService,
							@newInstanceOf(SocketService) private readonly socket: SocketService
	) {
		this.socket.connect('RDM client', this)
	}
	async attached(initiator: IHydratedController, flags: LifecycleFlags) {
		try {
			this.data = <RDM_Device[]>await this.api.get('/get-all');
			console.info('SUCCESS', this.data)
		} catch (e) {
			console.log('ERROR', e)
		}
	}
	detaching(initiator: IHydratedController, parent: IHydratedController, flags: LifecycleFlags) {
	}

	onopen = (event) => {
		console.log('SOCKET', event)
	};
	onmessage = (event) => {
		const  msg = JSON.parse(event.data);
		console.log('SOCKET', msg.event, msg.payload)
		if (msg.event === 'device:add') {
			this.data.push(msg.payload)
		} else if (msg.event === 'device:update') {
			const index = this.data.findIndex((o) => {
				return o.uid === msg.payload.uid
			})
			if (index > -1) {
				this.data[index].is_online = msg.payload.is_online;
				this.data[index].label = msg.payload.label;
				this.data[index].manufacturer = msg.payload.manufacturer;
				this.data[index].model = msg.payload.model;
				this.data[index].mode_index = msg.payload.mode_index;
				this.data[index].mode_count = msg.payload.mode_count;
				this.data[index].address = msg.payload.address;
			}
		}
	};
	onclose = (event) => {
		console.log('SOCKET', event)
	};
	onerror = (event) => {
		console.log('SOCKET', event)
	};



}
