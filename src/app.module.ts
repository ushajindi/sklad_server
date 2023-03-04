import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToolController } from './tool/tool.controller';
import { ToolModule } from './tool/tool.module';
import { ToolService } from './tool/tool.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ToolModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
