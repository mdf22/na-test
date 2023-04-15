import {  Module } from '@nestjs/common'
import {RdmController} from './controllers/rdm.controller'
import {RdmService} from './services/rdm.service'
import {EventsGateway} from  './controllers/events.gateway'
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
  imports: [
    EventEmitterModule.forRoot()
  ],
  controllers: [RdmController],
  providers: [RdmService, EventsGateway],
})
export class AppModule {}
