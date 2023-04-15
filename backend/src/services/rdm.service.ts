import { Logger,Injectable} from '@nestjs/common'
import {RDM_Device} from '../imports/RDM_Device'
import {EventEmitter2} from '@nestjs/event-emitter'

(BigInt.prototype as any).toJSON = function () {
	return this.toString();
};

@Injectable()
export class RdmService {
	private m_Counter = 0
	m_Devices: Array<RDM_Device> = []
	private readonly logger = new Logger('RDM SERVICE');
	constructor(private eventEmitter: EventEmitter2,

							) {}
	public addDevices(count: number) {
		for (let i = 0; i < count; i++) {
			const na = Math.random() > 0.5
			const device = {
				is_online: true,
				uid: (na ? '4E41' : '1AFA') + this.m_Counter.toString(16).padStart(8, '0'),
				uid_integer: BigInt((na ? 0x4E4100000000 : 0x1AFA00000000) + this.m_Counter),
				label: 'Device ' + this.m_Counter,
				manufacturer: na ? 'Company NA' : 'TMB',
				model: 'Test Device',
				mode_index: 1,
				mode_count: 16,
				address: 1,
			}
			this.m_Devices.push(device)
			this.m_Counter++
			this.logger.log('EMIT: '+ this.m_Counter)
			this.eventEmitter.emit('device:add',device)
		}
	}

	public allOnline()  {
		for (let i = 0; i < this.m_Devices.length; i++) {
			let device = this.m_Devices[i]
			if (device.is_online != true) {
				device.is_online = true
				this.eventEmitter.emit('device:update',device)
			}
		}
	}
	public allOffline()  {
		for (let i = 0; i < this.m_Devices.length; i++) {
			let device = this.m_Devices[i]
			if (device.is_online != false) {
				device.is_online = false
				this.eventEmitter.emit('device:update',device)
			}
		}
	}
	public randomOnline()  {
		for (let i = 0; i < this.m_Devices.length; i++) {
			let device = this.m_Devices[i]
			const random_state = Math.random() > 0.5
			if (device.is_online != random_state) {
				device.is_online = random_state
				this.eventEmitter.emit('device:update',device)
			}
		}
	}
	public allUpdate()  {
		let update_list: Array<RDM_Device> = []
		for (let i = 0; i < this.m_Devices.length; i++) {
			let device = this.m_Devices[i]
			let updated = false
			const random_state = Math.random() > 0.5
			const random_address = Math.floor((Math.random() * 511)) + 1
			const random_mode = Math.floor((Math.random() * 15))
			const change_label = Math.random() > 0.75
			if (device.is_online != random_state) {
				device.is_online = random_state
				updated = true
			}
			if (device.address != random_address) {
				device.address = random_address
				updated = true
			}
			if (device.mode_index != random_mode) {
				device.mode_index = random_mode
				updated = true
			}
			if (change_label) {
				device.label = "Random Label " + Math.floor(Math.random() * 1000)
				updated = true
			}
			if (updated) {
				update_list.push(device)
			}
		}

		for (let i = 0; i < update_list.length; i++) {
			this.eventEmitter.emit('device:update',update_list[i])
		}
	}
	public first10Update()  {
		let update_list: Array<RDM_Device> = []
		for (let i = 0; i < Math.min(this.m_Devices.length, 10); i++) {
			let device = this.m_Devices[i]
			let updated = false
			const random_state = Math.random() > 0.5
			const random_address = Math.floor((Math.random() * 511)) + 1
			const random_mode = Math.floor((Math.random() * 15))
			const change_label = Math.random() > 0.75
			if (device.is_online != random_state) {
				device.is_online = random_state
				updated = true
			}
			if (device.address != random_address) {
				device.address = random_address
				updated = true
			}
			if (device.mode_index != random_mode) {
				device.mode_index = random_mode
				updated = true
			}
			if (change_label) {
				device.label = "Random Label " + Math.floor(Math.random() * 1000)
				updated = true
			}
			if (updated) {
				update_list.push(device)
			}
		}

		for (let i = 0; i < update_list.length; i++) {
			this.eventEmitter.emit('device:update',update_list[i])
		}
	}
	public first100Update()  {
		let update_list: Array<RDM_Device> = []
		for (let i = 0; i < Math.min(this.m_Devices.length, 100); i++) {
			let device = this.m_Devices[i]
			let updated = false
			const random_state = Math.random() > 0.5
			const random_address = Math.floor((Math.random() * 511)) + 1
			const random_mode = Math.floor((Math.random() * 15))
			const change_label = Math.random() > 0.75
			if (device.is_online != random_state) {
				device.is_online = random_state
				updated = true
			}
			if (device.address != random_address) {
				device.address = random_address
				updated = true
			}
			if (device.mode_index != random_mode) {
				device.mode_index = random_mode
				updated = true
			}
			if (change_label) {
				device.label = "Random Label " + Math.floor(Math.random() * 1000)
				updated = true
			}
			if (updated) {
				update_list.push(device)
			}
		}

		for (let i = 0; i < update_list.length; i++) {
			this.eventEmitter.emit('device:update',update_list[i])
		}
	}
	public randomUpdate50()  {
		let update_list: Array<RDM_Device> = []
		for (let i = 0; i < this.m_Devices.length; i++) {
			if (Math.random() > 0.5)
				continue

			let device = this.m_Devices[i]
			let updated = false
			const random_state = Math.random() > 0.5
			const random_address = Math.floor((Math.random() * 511)) + 1
			const random_mode = Math.floor((Math.random() * 15))
			const change_label = Math.random() > 0.75
			if (device.is_online != random_state) {
				device.is_online = random_state
				updated = true
			}
			if (device.address != random_address) {
				device.address = random_address
				updated = true
			}
			if (device.mode_index != random_mode) {
				device.address = random_mode
				updated = true
			}
			if (change_label) {
				device.label = "Random Label " + Math.floor(Math.random() * 1000)
				updated = true
			}
			if (updated) {
				update_list.push(device)
			}
		}

		for (let i = 0; i < update_list.length; i++) {
			this.eventEmitter.emit('device:update',update_list[i])
		}
	}
	public randomUpdate2()  {
		let update_list: Array<RDM_Device> = []
		for (let i = 0; i < this.m_Devices.length; i++) {
			if (Math.random() > 0.02)
				continue

			let device = this.m_Devices[i]
			let updated = false
			const random_state = Math.random() > 0.5
			const random_address = Math.floor((Math.random() * 511)) + 1
			const random_mode = Math.floor((Math.random() * 15))
			const change_label = Math.random() > 0.75
			if (device.is_online != random_state) {
				device.is_online = random_state
				updated = true
			}
			if (device.address != random_address) {
				device.address = random_address
				updated = true
			}
			if (device.mode_index != random_mode) {
				device.address = random_mode
				updated = true
			}
			if (change_label) {
				device.label = "Random Label " + Math.floor(Math.random() * 1000)
				updated = true
			}
			if (updated) {
				update_list.push(device)
			}
		}

		for (let i = 0; i < update_list.length; i++) {
			this.eventEmitter.emit('device:update',update_list[i])
		}
	}

}

