import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(config: ConfigService, private prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        })
    }
    async validate(data: {sub:string, username:string}){
        const user= await this.prisma.user.findUnique({
            where:{
                userId: data.sub
            }
        })
        delete user.password
        return user
    }
}