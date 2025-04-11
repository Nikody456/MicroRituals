import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ritual } from './ritual.entity';
import { RitualCompletion } from './ritual-completion.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class RitualsService {
  constructor(
    @InjectRepository(Ritual)
    private ritualsRepository: Repository<Ritual>,
    @InjectRepository(RitualCompletion)
    private completionsRepository: Repository<RitualCompletion>,
    private usersService: UsersService,
  ) {}

  async create(userId: string, createRitualDto: Partial<Ritual>): Promise<Ritual> {
    const user = await this.usersService.findOne(userId);
    const ritual = this.ritualsRepository.create({
      ...createRitualDto,
      user,
    });
    return this.ritualsRepository.save(ritual);
  }

  async findAll(userId: string): Promise<Ritual[]> {
    return this.ritualsRepository.find({
      where: { user: { id: userId } },
      relations: ['completions'],
    });
  }

  async findOne(id: string): Promise<Ritual> {
    const ritual = await this.ritualsRepository.findOne({
      where: { id },
      relations: ['completions'],
    });
    if (!ritual) {
      throw new NotFoundException('Ritual not found');
    }
    return ritual;
  }

  async update(id: string, updateRitualDto: Partial<Ritual>): Promise<Ritual> {
    const ritual = await this.findOne(id);
    Object.assign(ritual, updateRitualDto);
    return this.ritualsRepository.save(ritual);
  }

  async remove(id: string): Promise<void> {
    const ritual = await this.findOne(id);
    await this.ritualsRepository.remove(ritual);
  }

  async markAsCompleted(userId: string, ritualId: string, comment?: string): Promise<RitualCompletion> {
    const ritual = await this.findOne(ritualId);
    const user = await this.usersService.findOne(userId);

    // Calculate streak
    const lastCompletion = await this.completionsRepository.findOne({
      where: { ritual: { id: ritualId } },
      order: { date: 'DESC' },
    });

    const streakCount = lastCompletion ? lastCompletion.streakCount + 1 : 1;

    const completion = this.completionsRepository.create({
      ritual,
      user,
      date: new Date(),
      streakCount,
      comment,
    });

    // Update user score
    await this.usersService.updateScore(userId, 1);

    return this.completionsRepository.save(completion);
  }
} 