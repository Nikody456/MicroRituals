import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User as CurrentUser } from '../auth/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: { email: string; password: string; username: string }): Promise<User> {
    return this.usersService.create(createUserDto.email, createUserDto.password, createUserDto.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOne(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/score')
  async updateScore(@Param('id') id: string, @Body() { points }: { points: number }): Promise<User> {
    return this.usersService.updateScore(id, points);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/achievements')
  async addAchievement(@Param('id') id: string, @Body() { achievement }: { achievement: string }): Promise<User> {
    return this.usersService.addAchievement(id, achievement);
  }
} 