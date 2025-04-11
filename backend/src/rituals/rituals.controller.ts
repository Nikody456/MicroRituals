import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RitualsService } from './rituals.service';
import { Ritual } from './ritual.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';

@Controller('rituals')
@UseGuards(JwtAuthGuard)
export class RitualsController {
  constructor(private readonly ritualsService: RitualsService) {}

  @Post()
  async create(@Body() createRitualDto: Partial<Ritual>, @User() user: any): Promise<Ritual> {
    return this.ritualsService.create(user.id, createRitualDto);
  }

  @Get()
  async findAll(@User() user: any): Promise<Ritual[]> {
    return this.ritualsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ritual> {
    return this.ritualsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRitualDto: Partial<Ritual>): Promise<Ritual> {
    return this.ritualsService.update(id, updateRitualDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.ritualsService.remove(id);
  }

  @Post(':id/complete')
  async markAsCompleted(
    @Param('id') id: string,
    @Body() { comment }: { comment?: string },
    @User() user: any,
  ): Promise<any> {
    return this.ritualsService.markAsCompleted(user.id, id, comment);
  }
} 