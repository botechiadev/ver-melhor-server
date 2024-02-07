import z from 'zod'
export interface GetUserByIdInputDTO{
   token: string
}


export interface GetUserByIdOutputDTO {
    id: string;
    name: string;
    email: string;
    role: string;
    created_at: string; // Suponho que seja uma string, ajuste conforme necessário
    avatar: string;
  }
  


export const GetUserByIdSchema = z.object(
    {
        token: z.string().min(1),
    }
).transform(data=> data as GetUserByIdInputDTO)