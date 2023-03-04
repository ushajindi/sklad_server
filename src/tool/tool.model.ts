import * as mongoose from "mongoose";

export const ToolSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date : {
        DMY: { type: String, required: true },
        time: { type: String, required: true },
    },
    attr: {
        serialNumber: { type: Number, required: true },
        diameter: { type: Number, required: true },
    },
    employeeName: { type: String, required: true },
    extradited: { type: Boolean, required: true },
});

export interface Tool extends mongoose.Document {
    id: string;
    title: string;
    date: {
        DMY: string;
        time: string;
    };
    attr?: {
        serialNumber?: number;
        diameter?: number;
    };
    employeeName: string;
    extradited: boolean;
}