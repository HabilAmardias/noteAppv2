import { Controller, Get, Post, Patch, Delete, UseGuards, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoteService } from './note.service';
import { GetUser } from 'src/auth/custom_decorator';
import { NoteDto } from './dto';
import { EditNoteDto } from './dto/edit-note.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('note')
export class NoteController {
    constructor(private noteService: NoteService){}

    @Get()
    getNote(@GetUser('userId') userId:string){
        return this.noteService.getNotes(userId)
    }

    @Get(':noteId')
    getNoteById(@GetUser('userId') userId:string, @Param('noteId',ParseUUIDPipe) noteId:string){
        return this.noteService.getNoteById(userId,noteId)
    }

    @Post()
    createNote(@GetUser('userId') userId:string, @Body() dto:NoteDto){
        return this.noteService.createNote(userId,dto)
    }

    @Delete(':noteId')
    deleteNote(@GetUser('userId') userId:string, @Param('noteId',ParseUUIDPipe) noteId:string){
        return this.noteService.deleteNote(userId,noteId)
    }

    @Patch(':noteId')
    editNote(@Body() dto:EditNoteDto, @Param('noteId',ParseUUIDPipe) noteId:string, @GetUser('userId') userId:string){
        return this.noteService.editNote(dto,noteId,userId)
    }
}
