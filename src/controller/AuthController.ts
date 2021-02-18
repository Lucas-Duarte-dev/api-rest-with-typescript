import { User } from '../model/User';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const index = (request: Request, response: Response) => {
    response.status(200).json({ UserID: request.userId });
}


export const authUser = async (request: Request, response: Response) => {
    const [, hash] = request.headers.authorization.split(' ')

    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

    const repository = getRepository(User);

    const user = await repository.findOne({ where: { email } });

    if(!user) {
        return response.status(401).json({ message: "User not found!" });
    }

    const isValidatePassword = await bcrypt.compare(password, user.password);

    if(!isValidatePassword) {
        return response.status(401).json({message: "Invalid password!"});
    }

    delete user.password;

    const token = jwt.sign({ id: user.id }, process.env.VALIDATE, { expiresIn: 86400 });

    return response.send({user, token});
}
