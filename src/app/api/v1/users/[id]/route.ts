import { DeleteUser, GetUser, GetUserByEmail, UpdatedUser } from "@/src/services/user.service"
import { UserValidation } from "@/src/validation/user.validation"
import { NextRequest, NextResponse } from "next/server"

type params = { 
    params : Promise<{ id : string}> 
}

export async function GET(request : NextRequest, { params }: params ) {
    try{
        const { id } = await params
        const userId = Number(id)
        const user = await GetUser(userId)

        if(!user){
            return NextResponse.json({
                success : false,
                message : "user not found"
            },{ status : 404 })
        }

        return NextResponse.json({
            success : true,
            message : "user retrevieid succesfully",
            user : user
        })

    }catch(error : unknown){
        return NextResponse.json({
            error : error instanceof Error ? error.message : ""
        },{ 
            status : 500 
        })
    }
}

export async function PUT(request : NextRequest ,{ params } : params) {
    try{
        const { id } = await params
        const userId = Number(id)
        const user = await GetUser(userId)
        if(!user){
            return NextResponse.json({
                success : false,
                message : "user not found"
            },{ status : 404 })
        }

        const body = await request.json()
        const result = UserValidation.safeParse(body)
        if(!result.success){
            return NextResponse.json({
                success : false,
                error : result.error.flatten().fieldErrors,
            },{ status : 422 })
        }

        const finduserEmail = await GetUserByEmail(result.data.email)
        if(finduserEmail){
            return NextResponse.json({
                succes  : false,
                message : "email already exists"
            })
        }

        const updatedUser = await UpdatedUser(userId ,result.data)
        return NextResponse.json({
            success : true,
            message : "user updated succesfully",
            user    : updatedUser
        })
    }catch(error : unknown){
        return NextResponse.json({
            error : error instanceof Error ? error.message : ""
        },{ 
            status : 500 
        })
    }
}

export async function DELETE(request : NextRequest ,{ params } : params) {
    try{
        const { id } = await params
        const userId = Number(id)
        const user = await GetUser(userId)
        if(!user){
            return NextResponse.json({
                success : false,
                message : "user not found"
            },{ status : 404 })
        }
        await DeleteUser(userId)
        return NextResponse.json({
            succes : true,
            message : "user deleted succesfully",
        })
    }catch(error : unknown){
        return NextResponse.json({
            succes : false,
            error : error instanceof Error ? error.message : ""
        }, { status : 500 })
    }
}