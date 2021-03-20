import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService implements OnModuleInit, OnApplicationBootstrap {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async insert(user: UserEntity): Promise<void> {
    const userData = new UserEntity();
    userData.username = user.username;
    userData.isActive = user.isActive;
    this.userRepository.save(userData);
  }

  onModuleInit() {
    console.log('模块初始化完成');
  }

  onApplicationBootstrap() {
    console.log('应用启动完成');
  }
}
