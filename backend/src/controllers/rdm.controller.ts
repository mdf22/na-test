
import {Controller, Get, Param, Post, Put} from '@nestjs/common'
import {RdmService} from '../services/rdm.service'
import {OnEvent} from '@nestjs/event-emitter'
import {RDM_Device} from '../imports/RDM_Device'

@Controller('/api/rdm')
export class RdmController {

	constructor(private readonly rdmService: RdmService) {
	}

	@Get('get-all')
	getAll(@Param() params: { id: number }):  Array<RDM_Device> {
		return this.rdmService.m_Devices;
	}

	@Get('add/:count')
	add(@Param() params: { count: number }): { }  {
		this.rdmService.addDevices(params.count)
		return {message: 'Devices added successfully',payload: this.rdmService.m_Devices};
	}
	@Put('online/all')
	public allOnline()  {
		this.rdmService.allOnline();
		return {message: 'Devices update successfully'};
	}
	@Put('online/none')
	public allOffline()  {
		this.rdmService.allOffline();
		return {message: 'Devices update successfully'};
	}
	@Put('online/random')
	public randomOnline()  {
		this.rdmService.randomOnline();
		return {message: 'Devices update successfully'};
	}
	@Put('update/all')
	public allUpdate()  {
		this.rdmService.allUpdate();
		return {message: 'Devices update successfully'};
	}
	@Put('update/first10')
	public first10Update()  {
		this.rdmService.first10Update();
		return {message: 'Devices update successfully'};
	}
	@Put('update/first100')
	public first100Update()  {
		this.rdmService.first100Update();
		return {message: 'Devices update successfully'};
	}
	@Put('update/random50')
	public randomUpdate50()  {
		this.rdmService.randomUpdate50();
		return {message: 'Devices update successfully'};
	}
	@Put('update/random2')
	public randomUpdate2()  {
		this.rdmService.randomUpdate2();
		return {message: 'Devices update successfully'};
	}

}
