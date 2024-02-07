import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { USER_ROLES } from '../models/User';
dotenv.config();

export interface TokenPayload {
    id: string;
    name: string;
    role: USER_ROLES;
    avatar: string;
} // realocar para o arquivo da entidade User

export class TokenManager {
    public createToken = (payload: TokenPayload): string => {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string, // Assegura que JWT_KEY esteja definido e é uma string
            {
                expiresIn: process.env.JWT_EXPIRES_IN // Configuração opcional de expiração
            }
        );
        return token;
    }

    public getPayload = (token: string): TokenPayload | null => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string // Assegura que JWT_KEY esteja definido e é uma string
            );

            return payload as TokenPayload;
        } catch (error) {
            return null;
        }
    }
}
