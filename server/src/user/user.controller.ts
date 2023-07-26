import { Controller, Get, UseGuards,Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/custom_decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    @Get()
    getMe(@GetUser() user: User){
        return user
    }
}
