import {LifecycleFlags} from 'aurelia'
import {IHydratedController} from '@aurelia/runtime-html'
import {ApiService} from '../../plugins/services/api.service'
import {ISocketClient, SocketService} from '../../plugins/services/socket.service'
import {newInstanceOf} from '@aurelia/kernel'
export class Admin implements ISocketClient{

	addCount: number = 0;
	onlineChecked ='none';

	constructor(private readonly api: ApiService,
							@newInstanceOf(SocketService) private readonly socket: SocketService
							) {
			this.socket.connect('RDM client', this)
	}
	attached(initiator: IHydratedController, flags: LifecycleFlags) {

	}
	detaching(initiator: IHydratedController, parent: IHydratedController, flags: LifecycleFlags) {
	}

	onAddDevice() {
		try {
			const response = this.api.AddDevices(this.addCount);
			console.info('SUCCESS')
		} catch (e) {
			console.log('ERROR', e)
		}
	}
	setUpdate(url) {
		try {
			const response = this.api.put(url);
			console.info('SUCCESS:',  url)
		} catch (e) {
			console.log('ERROR', e)
		}
	}

	onopen = (e) => {
		console.log('SOCKET', e)
	};
	onmessage = (event) => {
		console.log('SOCKET', event)
	};
	onclose = (event) => {
		console.log('SOCKET', event)
	};
	onerror = (event) => {
		console.log('SOCKET', event)
	};
}
