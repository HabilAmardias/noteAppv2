import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){}
    async deleteUser(userId:string){
        try{
            const deleteNotes=this.prisma.note.deleteMany({
                where:{
                    authorId: userId
                }
            })
            const deleteUser=this.prisma.user.delete({
                where:{
                    userId:userId
                }
            })
    
            const transaction = await this.prisma.$transaction([deleteNotes,deleteUser])
            return transaction
        }catch(error){
            throw error
        }
    }
}
