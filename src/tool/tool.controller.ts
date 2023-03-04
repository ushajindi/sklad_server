import { Controller, Get, Post, Put, Delete, Param, Body, Headers } from '@nestjs/common';
import { ToolService } from "./tool.service";
import { Tool } from "./tool.model";


@Controller('tool')
export class ToolController {
    constructor(private readonly toolService: ToolService) {}

    @Get("/tools")
    async getTools() {
        const tools = await this.toolService.getTools();
        return tools;
    }

    @Get("/returned-tools")
    async getReturnedTools() {
        const tools = await this.toolService.getReturnedTools();
        return tools;
    }

    @Get("/not-returned-tools")
    async getNotReturnedTools() {
        const tools = await this.toolService.getNotReturnedTools();
        return tools;
    }

    @Get(":id")
    async getTool(@Param('id') id: string) {
        const tool = await this.toolService.getTool(id);
        return tool;
    }

    @Post("/insert-tool")
    async insertTool(@Body('tool') tool: Tool, @Headers() headers){
        const action = await this.toolService.insertTool(tool);
        console.log(tool)
        return action;
    }

    @Put(":id")
    async updateTool(@Param('id') id: string, @Body('extradited') extradited) {
        const action = await this.toolService.updateTool(id, extradited);
        return action;
    }

    @Delete(":id")
    async removeTool(@Param('id') id: string) {
        const action = await this.toolService.removeTool(id);
        return action;
    }
}
