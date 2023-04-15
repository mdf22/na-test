import {
	MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from '@nestjs/websockets'
import { Server } from 'ws'
import {OnEvent} from '@nestjs/event-emitter'
import { Logger,Injectable} from '@nestjs/common'

@WebSocketGateway(4000,{
	cors: {
		origin: '*',
	},
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
	@WebSocketServer()
	server: Server
	wsClients=[]
	private readonly logger = new Logger('RDM SOCKET EMITTER');

	@OnEvent('device:add')
	handleAddDevicesEvent(payload: any) {
		this.broadcast('device:add', payload)
	}
	@OnEvent('device:update')
	handleUpdateDevicesEvent(payload: any) {
		this.broadcast('device:update', payload)
	}
	afterInit(server: any): any {
	}

	handleConnection(client: any): any {
		this.logger.debug('SOCKET connection open' )
		this.wsClients.push(client)
	}

	handleDisconnect(client: any): any {
		for (let i = 0; i < this.wsClients.length; i++) {
			if (this.wsClients[i].id === client.id) {
				this.wsClients.splice(i, 1)
				break
			}
		}
		this.broadcast('disconnect',{})
	}
	private broadcast(event, payload: any) {
		try {
			const broadCastMessage = JSON.stringify({
				event:event,
				payload: payload
			})
			for (let i = 0; i < this.wsClients.length; i++) {
					this.wsClients[i].send(broadCastMessage)
			}
			this.logger.log('SOCKET client broadcast emitted')
		} catch (e) {
			this.logger.error('SOCKET client broadcast error: ' + e.toString())
		}
	}
}
