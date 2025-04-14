import { Response, Request } from 'express';

export const formatResponse = (data: any, message: string = 'Success', status: number = 200) => {
    return {
        status,
        message,
        data,
    };
};

export const handleError = (res: Response, error: any, status: number = 500) => {
    const message = error.message || 'Internal Server Error';
    res.status(status).json(formatResponse(null, message, status));
};