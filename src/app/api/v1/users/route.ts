import { Createuser, GetUserByEmail, GetUsers } from "@/src/services/user.service"
import { UserValidation } from "@/src/validation/user.validation"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        const users = await GetUsers()
        return NextResponse.json({
            success   : true,
            message   : "users fetched succesfully",
            users     : users,
        })
    }catch(err : unknown){
        return NextResponse.json({
            success : false,
            message : "users fetching failled",
            error   : err instanceof Error ? err.message : ""
        },{
            status : 500
        })
  }
}

export async function POST(request : NextRequest) {
    try{
        const body = await request.json()
        const result = UserValidation.safeParse(body)
        if(!result.success){
            return NextResponse.json({
                success : false,
                error : result.error.flatten().fieldErrors,
            },{ status : 422 })
        }
        const data = result.data
        const user = await GetUserByEmail(data.email)
        if(user){
            return NextResponse.json({
                success : false,
                message : "user email already exists",
            })
        }
        const CreatedUser = await Createuser(data)
        return NextResponse.json({
            success : true,
            message : "user created succesfully",
            user    : CreatedUser
        },{
            status : 201
        })
    }catch(error : unknown){
        return NextResponse.json({
            succes : false,
            message : error instanceof Error ? error.message : "Invalid JSON body"
        },{ 
            status : 400 
        })
    }
}