import z from 'zod'
import { USER_ROLES } from '../../models/User'
export interface SignupInputDTO{
    name: string,
    email: string,
    password: string,
    role:USER_ROLES
}


export interface SignupOutputDTO{
    token: string
}


export const SignUpSchema = z.object(
    {
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8).max(12),
        role: z.string().min(3)
    }
).transform(data=> data as SignupInputDTO)