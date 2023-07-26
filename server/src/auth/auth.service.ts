import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService){}
    async signup(dto:AuthDto){
        const hashed = await bcrypt.hash(dto.password,12)
        try{
            const user=await this.prisma.user.create({
                data:{
                    username:dto.username,
                    password:hashed
                }
            })
            return this.signToken(user.userId,user.username)
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
        return this.signToken(user.userId,user.username)
    }

    async signToken(userId: string, username:string){
        const data={
            sub: userId,
            username:username
        }
        const token= await this.jwt.signAsync(data, {
            expiresIn: '10m',
            secret: this.config.get('JWT_SECRET')
        })
        return{
            token: token
        }
    }
}
