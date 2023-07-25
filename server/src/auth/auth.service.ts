import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    async signup(dto:AuthDto){
        const hashed = await bcrypt.hash(dto.password,12)
        try{
            const user=await this.prisma.user.create({
                data:{
                    username:dto.username,
                    password:hashed
                }
            })
            delete user.password
            return user
        } catch(err){
            if(err instanceof PrismaClientKnownRequestError){
                if(err.code==='P2002'){
                    throw new ForbiddenException('Credentials already taken')
                }
            }
            throw err
        }
    }
    async signin(dto:AuthDto){
        const user = await this.prisma.user.findUnique({
            where:{
                username: dto.username
            }
        })
        if(!user){
            throw new ForbiddenException('Incorrect Credentials')
        }
        const match=bcrypt.compare(dto.password, user.password)
        if (!match){
            throw new ForbiddenException('Incorrect Credentials')
        }
        delete user.password
        return user
    }
}
