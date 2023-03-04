import { Module } from '@nestjs/common';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolSchema } from "./tool.model";

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Tool', schema: ToolSchema }])],
  controllers: [ToolController],
  providers: [ToolService]
})
export class ToolModule {}
