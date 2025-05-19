import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/auth/enum/role.enum';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/r/roles/roles.guard';

@Controller('user')
export class UserController {
constructor(private readonly UserService: UserService) {}


  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    
    return await this.UserService.create(createUserDto);
  }

  
  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('========', id);

    return this.UserService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.UserService.update(id, updateUserDto);
  }

@UseGuards(RolesGuard)
@Roles(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserService.remove(id);
  }

@Post()
creat(@Body() createCatDto: CreateUserDto) {
  this.UserService.create(createCatDto);
}
}

