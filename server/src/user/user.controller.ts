import { Controller, Get, UseGuards, Delete, Param, ParseUUIDPipe} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/custom_decorator';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get()
    getMe(@GetUser() user: User){
        return user
    }

    @Delete(':userId')
    deleteMe(@Param('userId',ParseUUIDPipe) userId:string){
        return this.userService.deleteUser(userId)
    }
}
