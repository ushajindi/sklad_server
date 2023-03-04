import { Injectable, NotFoundException } from '@nestjs/common';
import  { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as moment from 'moment';


import { Tool } from "./tool.model";

@Injectable()
export class ToolService {
    constructor(
        @InjectModel ('Tool') private readonly toolModel: Model<Tool>
    ) {}

    async getTools() {
        const tools = await this.toolModel.find().exec();

        return tools.map((tool) => ({
            id: tool.id,
            title: tool.title,
            date: {
                DMY: tool.date.DMY,
                time: tool.date.time,
            },
            attr: {
                serialNumber: tool.attr.serialNumber,
                diameter: tool.attr.diameter
            },
            employeeName: tool.employeeName,
            extradited: tool.extradited,
        }));
    }

    async getReturnedTools() {
        const date = moment().format("DD.MM.YYYY");

        const tools = await this.toolModel.find({
            "date.DMY":date,
            "extradited":false
        }).exec();

        return tools.map((tool) => ({
            id: tool.id,
            title: tool.title,
            date: {
                DMY: tool.date.DMY,
                time: tool.date.time,
            },
            attr: {
                serialNumber: tool.attr.serialNumber,
                diameter: tool.attr.diameter
            },
            employeeName: tool.employeeName,
            extradited: tool.extradited,
        }));
    }

    async getNotReturnedTools() {
        const date = moment().format("DD.MM.YYYY");

        const tools = await this.toolModel.find({
            "extradited":true
        }).exec();

        return tools.map((tool) => ({
            id: tool.id,
            title: tool.title,
            date: {
                DMY: tool.date.DMY,
                time: tool.date.time,
            },
            attr: {
                serialNumber: tool.attr.serialNumber,
                diameter: tool.attr.diameter
            },
            employeeName: tool.employeeName,
            extradited: tool.extradited,
        }));
    }

    async getTool(id: string): Promise<Tool> {
        let tool;

        try {
            tool = await this.toolModel.findById(id).exec();
        } catch(error) {
            throw new NotFoundException('Could not find tool.');
        }
        
        return tool;
    }

    async insertTool(tool: Tool) {
        try {
            const newTool = new this.toolModel({
                title: tool.title,
                date: {
                    DMY: tool.date.DMY,
                    time: tool.date.time,
                },
                attr: {
                    serialNumber: tool.attr.serialNumber,
                    diameter: tool.attr.diameter,
                },
                employeeName: tool.employeeName,
                extradited: tool.extradited,
            });
    
            const result = await newTool.save();
    
            return {
                error: false,
                status: 200,
                message: "Инструмент успешно сохранён",
            }

        } catch(error) {
            return {
                error: true,
                status: error.status,
                message: error.message,
            }
        }
        
    }

    async updateTool(id: string, extradited: boolean) {
        try {
            const tool = await this.getTool(id);
            tool.extradited = extradited;
           
    
            const result = await tool.save();
    
            return {
                error: false,
                status: 200,
                message: "Инструмент успешно обновлён",
            }

        } catch (error) {
            return {
                error: true,
                status: error.status,
                message: error.message,
            }
        }
       
    }

    async removeTool(id: string) {
        try {
            const result = await this.toolModel.deleteOne({_id: id}).exec();
            return{
                error: false,
                status:200,
                message:"Инструмен успешно удалён",
            } 
        
        } catch (error) {
            return{
                error: true,
                status: error.status,
                message: error.message,
            }
        }
        
    }
}
