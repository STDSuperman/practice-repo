import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async findOne(id: number): Promise<UserEntity>{
        return await this.userRepository.findOne(id);
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async insert(user: UserEntity): Promise<void> {
        let userData = new UserEntity();
        userData.username = user.username;
        userData.isActive = user.isActive;
        this.userRepository.save(userData);
    }
}