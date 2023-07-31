import { Response, Request, NextFunction } from "express"
import { ZodTypeAny } from "zod"

const validateData = (schema: ZodTypeAny) => (request: Request, response: Response, next: NextFunction): void => {
    
    const validate = schema.parse(request.body)

    request.body = validate

    return next()
}

export {
    validateData
}