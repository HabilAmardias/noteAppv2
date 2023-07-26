import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoteDto } from './dto';
import { deleteNoteDto } from './dto/delete-note.dto';

@Injectable()
export class NoteService {
    constructor(private prisma: PrismaService){}
    async getNotes(userId:string){
        const notes=await this.prisma.note.findMany({
            where:{
                authorId:userId
        }})
        return {notes}
    }

    async createNote(userId:string, dto: NoteDto){
        try{
            const note = await this.prisma.note.create({
                data:{
                    noteTitle:dto.noteTitle,
                    authorId:userId,
                    noteDesc:dto.noteTitle
                }
            })
            return note
        } catch(err){
            throw err
        }
    }

    async deleteNote(userId:string,dto: deleteNoteDto){
        try{
            const note = await this.prisma.note.findUnique({
                where:{
                    noteId:dto.noteId
                }
            })
            if(note.authorId !== userId){
                return new ForbiddenException('Access to note denied')
            }
            const deletedNote= await this.prisma.note.delete({
                where:{
                    noteId:dto.noteId
                }
            })
            return deletedNote
        } catch(err){
            throw err
        }
    }
}
