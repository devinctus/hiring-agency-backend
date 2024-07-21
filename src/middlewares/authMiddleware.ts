// backend/middlewares/authMiddleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

export interface AuthRequest extends Request {
    user?: IUser;
}

export interface JwtDecoded {
    id: string;
}

export const auth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    let token: string | undefined;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!,
            ) as JwtDecoded;
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                res.status(401).json({
                    message: 'Not authorized, user not found',
                });
                return;
            }

            req.user = user;
            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};
