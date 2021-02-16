import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({default: true})
    isActive: boolean;
}