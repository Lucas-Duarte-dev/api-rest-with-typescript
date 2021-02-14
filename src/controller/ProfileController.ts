import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Profile } from '../model/Profile';
import { User } from '../model/User';

export const postProfile = async (request: Request, response: Response) => {
    const { user_id } = request.params;
    const { name, bio } = request.body;
    try {
        const user = await getRepository(User).findOne(user_id);

        if(!user) {
            return response.status(401).json({ message: "User not found!" });
        }

        const repository = getRepository(Profile);

        const profile = await repository.save({name, bio, userId: user_id});

        

        response.json(profile);

    } catch (error) {
        response.status(401).json({ message: "Cannot create a profile!" });
    }
}

export const indexProfile = async (request: Request, response: Response) => {
    
    const profile = await getRepository(Profile).find();
    response.json(profile);
}