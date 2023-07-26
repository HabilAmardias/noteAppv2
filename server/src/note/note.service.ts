import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoteDto } from './dto';
import { EditNoteDto } from './dto/edit-note.dto';

@Injectable()
export class NoteService {
    constructor(private prisma: PrismaService){}
    async getNotes(userId:string){
        try{
            const notes=await this.prisma.note.findMany({
                where:{
                    authorId:userId
            }})
            return {notes}
        } catch(error){
            throw error
        }
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

    async deleteNote(userId:string,noteId:string){
        const note = await this.prisma.note.findUnique({
            where:{
                noteId:noteId
            }
        })
        if(!note || note.authorId !== userId){
            return new ForbiddenException('Access to note denied')
        }
        const deletedNote= await this.prisma.note.delete({
            where:{
                noteId:noteId
            }
        })
        return deletedNote
    }

    async editNote(dto:EditNoteDto,noteId:string,userId:string){
        const note = await this.prisma.note.findUnique({
            where:{
                noteId:noteId
            }
        })

        if(!note || note.authorId !== userId){
            return new ForbiddenException('Access to note denied')
        }

        const editedNote=await this.prisma.note.update({
            where:{
                noteId:noteId
            },
            data:{
                noteTitle:dto.noteTitle,
                noteDesc:dto.noteDesc
            }
        })
        return editedNote
    }
}
