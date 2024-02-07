import { IUserDB, User } from '../models/User';
import { BaseDatabase } from "./BaseDatabase";

// nao tem injecao de dependencias
// deixar nome de tabelas relacionadas a users
export class UserDatabase extends  BaseDatabase{
    public static TABLE_USERS = "users"

    public insertUser = async(userDB:IUserDB):Promise<void> =>{
        // como baseDatabase e static nao coloca this porque nao pode atribuir qualquer metodo estatico referencia a classe
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB)
    }

    public findUserByEmail = async(email:string):Promise<IUserDB[]|undefined[]> =>{
        // como baseDatabase e static nao coloca this porque nao pode atribuir qualquer metodo estatico referencia a classe
        const userDB:IUserDB[]|undefined = await BaseDatabase.connection(UserDatabase.TABLE_USERS).select().where({email})

        return userDB
    }

    public findUserById = async(id:string):Promise<IUserDB> =>{
        // como baseDatabase e static nao coloca this porque nao pode atribuir qualquer metodo estatico referencia a classe
        const [userDB] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).select().where({id})

        return userDB as  IUserDB
    }
}