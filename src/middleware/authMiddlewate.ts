import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validate } from '../auth/auth'

interface TokenPay {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddlewate(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;
    
    if(!authorization) {
        return response.status(401);
    }

    const token = authorization.replace('Bearer', '').trim();


    try {
        const data = jwt.verify(token, validate);

        const { id } = data as TokenPay;

        request.userId = id;

        return next();
    } catch {
        return response.status(401)
    }
}