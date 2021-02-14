import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate, OneToOne} from "typeorm";
import bcrypt from 'bcryptjs';
import { Profile } from "./Profile";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @OneToOne(type => Profile, user => User)
    profile: Profile;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        select: true,
    })
    password: string;

    
    @CreateDateColumn()
    created_at: Date;
    
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}
