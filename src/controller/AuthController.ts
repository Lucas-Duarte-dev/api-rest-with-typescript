import { User } from '../model/User';
import { getRepository } from 'typeorm';
import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const index = (request: Request, response: Response) => {
    response.status(200).json({ UserID: request.userId });
}


export const authUser = async (request: Request, response: Response) => {
    const {email, password} = request.body;

    const verifyUser = getRepository(User);

    const user = await verifyUser.findOne({ where: { email } });

    if(!user) {
        response.status(401).json({message: "User not found!"});
    }

    const isValidatePassword = await bcrypt.compare(password, user.password);

    if(!isValidatePassword) {
        response.status(401).json({message: "Invalid password!"});
    }

    delete user.password;

    const token = jwt.sign({ id: user.id}, process.env.VALIDATE, { expiresIn: 86400 });

    response.json({user, token});
}
