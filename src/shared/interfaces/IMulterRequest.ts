import { Request } from "express";

export interface IMulterRequest extends Request {
    files: {
        file?: Express.Multer.File[];
    };
}