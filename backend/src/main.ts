

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {NestExpressApplication} from '@nestjs/platform-express'
import { WsAdapter} from "@nestjs/platform-ws";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication> (
      AppModule, {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    }
  )
  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors({
      origin: '*',
      optionsSuccessStatus: 200
    }
  );
  await app.listen(3000)
}
try {
  bootstrap()
} catch (err) {
  console.log('FATAL BOOT ERROR')
}

