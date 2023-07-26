import { Controller, Get, Post, Patch, Delete, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoteService } from './note.service';
import { GetUser } from 'src/auth/custom_decorator';
import { NoteDto } from './dto';
import { deleteNoteDto } from './dto/delete-note.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('note')
export class NoteController {
    constructor(private noteService: NoteService){}

    @Get()
    getNote(@GetUser('userId') userId:string){
        return this.noteService.getNotes(userId)
    }

    @Post()
    createNote(@GetUser('userId') userId:string, @Body() dto:NoteDto){
        return this.noteService.createNote(userId,dto)
    }

    @Delete()
    deleteNoteDto(@GetUser('userId') userId:string, @Body() dto:deleteNoteDto){
        return this.noteService.deleteNote(userId,dto)
    }
}
