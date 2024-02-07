export enum USER_ROLES {
    PADRINHO = "PADRINHO",
    MEDICO="MEDICO",
    OTICA="OTICA",
    APADRINHADO="APADRINHADO",

}

export interface IUserDB {
    id :string,
  name :string,
  email :string,
  password :string,
  role : USER_ROLES,
  avatar: string,
  created_at :string
}


export interface IUserModel {
    id :string,
    name :string,
    email :string,
    role: USER_ROLES,
    avatar:string,
    createdAt: string
}


export class User{

    constructor(
private id :string,
private name :string,
private email :string,
private password: string,
private role: USER_ROLES,
private avatar: string,
private  createdAt: string
){}

public getId():string{
    return this.id
}


public getName():string{
    return this.name
}

public getEmail():string{
    return this.email
}

public getPassword():string{
    return this.password
}

public getRole():USER_ROLES{
    return this.role
}

public getCreatedAt():string{
    return this.createdAt
}

public getAvatar():string{
    return this.avatar
}

public setAvatar(value:string):void{
    this.avatar = value;
}

public setEmail(value:string):void{
     this.email = value
}


public setPassword(value:string):void{
    this.password = value
}

public setRole(value:USER_ROLES):void{
    this.role = value
}

public toIDBModel():IUserDB{
    return{
        id : this.id,
        name :this.name,
        email : this.email,
        password : this.password,
        role : this.role,
        avatar: this.avatar,
        created_at :this.createdAt
    }
}

// diminuem codigo em business
public toIUserModel(): IUserModel{
    return{
            id :this.id,
            name :this.name,
            email :this.email,
            role: this.role,
            avatar: this.avatar,
            createdAt: this.createdAt
    }
}

}