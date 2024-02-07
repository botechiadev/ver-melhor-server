import express, {Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './router/UserRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.get('/ping', (req:Request, res:Response)=>{
    res.status(200).json('pong')
})
app.use('/users', userRouter)



app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`)
})