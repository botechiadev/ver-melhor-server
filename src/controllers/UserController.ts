import { UserBusiness } from "../business/UserBusiness"
import { Request, Response } from "express"
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { SignUpSchema } from "../DTOs/user/signup.dto"
import { LoginSchema } from "../DTOs/user/login.dto";
import { GetUserByIdSchema, GetUserByIdOutputDTO } from '../DTOs/user/getUserById.dto';

export class UserController{
    constructor(
        private userBusiness: UserBusiness
    ){}


    /*-----------------------sign up --------------------*/


    public signup1 = async(req:Request, res:Response)=>{
        try {
            const input = SignUpSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            })


            const output  = await this.userBusiness.signup1(input)

            res.status(201).send(output)
        } catch (error) {
            if(error instanceof ZodError){
            console.log(error)
            res.status(400).send(error.issues)
            }else if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send('Error Inesperado')
                console.log(error)
            }
        }
    }
    /**********************LOGIN************ */


    public login = async(req:Request, res:Response)=>{
        try {
            const input = LoginSchema.parse({
                email: req.body.email as string,
                password: req.body.password as string,
            })


            const output  = await this.userBusiness.login(input)

            res.status(200).send(output)
        } catch (error) {
            if(error instanceof ZodError){
            console.log(error)
            res.status(400).send(error.issues)
            }else if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send('Error Inesperado')
            }
        }
    }

    public getUserById = async(req:Request, res:Response)=>{
        try {
            const input = GetUserByIdSchema.parse({
                token: req.headers.authorization  
            })


            const output  = await this.userBusiness.getUserById(input)

            res.status(200).json(output)
        } catch (error) {
            if(error instanceof ZodError){
            console.log(error)
            res.status(400).send(error.issues)
            }else if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                console.log(error)
                res.status(500).json('Error Inesperado')
            }
        }
    }
}