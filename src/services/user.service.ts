import { prisma } from "../lib/prima"

type postBody = { 
    username : string,
    email : string 
}
type putBody = { 
    username? : string,
    email? : string 
}

export async function GetUsers(){
    return prisma.user.findMany({
        orderBy : {
            createdAt : "desc"
        }
    })
}

export async function GetUser(id : number){
    return prisma.user.findUnique({
        where : {
            id : id
        }
    })
}

export async function Createuser(body : postBody) {
    return prisma.user.create({
        data : {
            username : body.username,
            email : body.email
        }
    })
}

export async function GetUserByEmail(email : string) {
    return prisma.user.findUnique({
        where : {
            email : email
        }
    })
}

export async function UpdatedUser(id : number , body : putBody) {
    return prisma.user.update({
        where : {
            id : id
        },
        data : body
    })
}

export async function DeleteUser(id : number) {
    return prisma.user.delete({
        where : {
            id : id
        }
    })
}