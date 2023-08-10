import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import fs from 'fs';

export const ensureArchiveIsValidTxt = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    const filePath = request.file!.path;

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            throw new AppError("Error reading the file.", 500)
        }

        const transactionsList = data.split("\r\n")

        for (const item of transactionsList) {
            if (item.length > 0) {
                const type = item[0] 
                const value = item.slice(56, 66)
    
                if (isNaN(parseInt(type)) || parseInt(type) > 4 || isNaN(parseInt(value))) {
                    return response.status(400).json({message: 'The file has no transaction data'})
                } else {
                    return next()
                }
            }
        }
    })

}