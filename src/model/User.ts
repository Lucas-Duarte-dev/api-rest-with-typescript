import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn ,BeforeInsert, BeforeUpdate, OneToMany, JoinColumn } from "typeorm";
import { IsEmail, MinLength } from 'class-validator'
import bcrypt from 'bcryptjs';
import { Post } from "./Posts";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false,
    })
    @MinLength(2, { message: "The name must be at least 2 characters"})
    name: string;

    @Column()
    bio?: string;

    @Column()
    github?: string;
    
    @Column({
        unique: true,
        nullable: false,
    })
    @IsEmail()
    email: string;

    @Column({
        select: true,
        nullable: false,
    })
    @MinLength(5, { message: "The name must be at least 2 characters"})
    password: string;

    @OneToMany(() => Post, post => post.user, { cascade: ["insert", "update"] })
    @JoinColumn({ name: 'user_id' })
    posts: Post[]

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
