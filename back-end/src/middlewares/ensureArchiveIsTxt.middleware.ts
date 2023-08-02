import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

export const ensureArchiveIsTxt = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    if (!request.file) {
        throw new AppError("No files sent.", 400)
    } 

    const archiveName = request.file?.originalname

    const dotIndex = archiveName!.indexOf(".");

    const archiveFormat = archiveName!.slice(dotIndex + 1)

    if (archiveFormat !== "txt") {
        throw new AppError("The file format must be 'txt'.", 400)
    }

    return next()
}