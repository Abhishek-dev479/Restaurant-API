import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface CustomRequest extends Request {
    user?: any;
}

export function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log(token);
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'my-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log('decoded: ' + decoded);
        // @ts-ignore
        req.user = decoded as { [key: string]: any };
        next();
    });
}


