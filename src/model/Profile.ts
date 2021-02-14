import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('profile')
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, profile => Profile)
    @JoinColumn()
    user: User

    @Column()
    name: string;

    @Column()
    bio: string;

    @CreateDateColumn()
    created_at: Date;
}