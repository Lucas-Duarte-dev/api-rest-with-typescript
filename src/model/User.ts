import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn ,BeforeInsert, BeforeUpdate} from "typeorm";
import bcrypt from 'bcryptjs';


@Entity('users')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column()
    bio?: string;

    @Column()
    github?: string;
    
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
    
    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}
