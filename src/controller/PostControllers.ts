import {Request, Response} from 'express';
import { getRepository } from 'typeorm'
import { Post } from '../model/Posts';
import { User } from '../model/User';

export const postPosts = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const {title, description} = request.body;

        const repository = getRepository(Post);

        const userRepository = getRepository(User);

        const user = await userRepository.findOne(id);

        if(!user) {
            return response.status(401).json({ message: "Cannot possibly create post with this user" });
        }
        
        const posts = await repository.save({title, description, user});

        return response.json(posts);
    } catch (error) {
        response.status(401).json({ erro: error })
    }
    
}

export const getPost = async (request: Request, response: Response) => {
    const repository = getRepository(Post);

    const posts = await repository.find()
    
    response.json(posts)
}
