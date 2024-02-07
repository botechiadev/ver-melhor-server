import { HashManager } from './../services/HashManager';
import { TokenManager, TokenPayload } from './../services/TokenManager';
import { UserDatabase } from "../database/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { SignupOutputDTO, SignupInputDTO } from '../DTOs/user/signup.dto';
import { IUserDB, USER_ROLES, User } from '../models/User';
import { LoginInputDTO, LoginOutputDTO } from '../DTOs/user/login.dto';
import { NotFoundError } from '../errors/NotFoundError';
import { BadRequestError } from '../errors/BadRequestError';
import { GetUserByIdInputDTO, GetUserByIdOutputDTO } from '../DTOs/user/getUserById.dto';

export class UserBusiness{
    constructor(
        private userDatabase : UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}

    // garante que business vai modelar objeto em resposta
    public signup1 = async(input: SignupInputDTO):Promise<SignupOutputDTO> =>{
        const {name, email, password, role}=input;
        const id = this.idGenerator.generate();
        const avatar = "https://i.postimg.cc/RFwFy79H/logo-Avatar.webp"
        const hashedPassword = await this.hashManager.hash(password);
        const user = new User(
            id,
            name,
            email,
            hashedPassword,
            role,
            avatar,
            new Date().toISOString()
        );

        const userDB =await user.toIDBModel();
        await this.userDatabase.insertUser(userDB);

        const payload :TokenPayload={
            id: user.getId(),
            name: user.getName(),
            role: user.getRole(),
            avatar: user.getAvatar()
        }
      const token= this.tokenManager.createToken(payload)
        const output:SignupOutputDTO ={
            token,
        }
        return output
    }
    
    public login = async(input: LoginInputDTO):Promise<LoginOutputDTO> =>{

        const { email, password}=input;
        
   
        const id = this.idGenerator.generate();
        const userDB = await this.userDatabase.findUserByEmail(email);

        const firstUser = userDB[0]
        if(!firstUser){
            throw new NotFoundError('Email nao cadastrado');
        }

        const user = new User(
            firstUser.id,
            firstUser.name,
            firstUser.email,
            firstUser.password,
            firstUser.role,
            firstUser.avatar,
            firstUser.created_at
        )

        const hashedPassword = user.getPassword()
        const isPasswordCorrect = await this.hashManager.
        compare(password, hashedPassword)

        if(!isPasswordCorrect){
            throw new BadRequestError('Usuario nao autorizado')
        }

        const payload: TokenPayload={
            id: user.getId(),
            name: user.getName(),
            role: user.getRole(),
            avatar: user.getAvatar()
        }

        const token = this.tokenManager.createToken(payload)
        const output: LoginOutputDTO={
            token
        }
        return output
    }

    public getUserById = async (input: GetUserByIdInputDTO): Promise<GetUserByIdOutputDTO> => {
       const { token } = input; 
       try {
          
      
          // Obtenha o payload uma vez, já que você já o obteve
          const payload = this.tokenManager.getPayload(token);
      
          // Verifique se o payload é nulo antes de acessar suas propriedades
          if (!payload) {
            throw new Error("Payload não encontrado no token.");
          }
      
          // Utilize diretamente o id do payload
          const id = payload.id;
      
          // Use o id diretamente para encontrar o usuário
          const firstUser = await this.userDatabase.findUserById(id);
      
          const user: GetUserByIdOutputDTO = {
            id: firstUser.id,
            name: firstUser.name,
            email: firstUser.email,
            role: firstUser.role,
            created_at: firstUser.created_at, // Ajuste conforme necessário
            avatar: firstUser.avatar,
          };
      
          return user;
        } catch (error) {
          throw new Error(`Erro ao obter usuário por ID` );
        }
      };
    }
      