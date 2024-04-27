import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_KEY = process.env.JWT_KEY || 'SECRET';

export const AdminAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const msg = { status: false, message: "You are not logged in as Admin." }

    if (!token) {
        return res.json(msg);
    }

    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if (err) return res.json(msg);
        if (!(decoded as any).adminId) return res.json(msg);
        (req as any).adminId = (decoded as any).adminId;
        next();
    });
};