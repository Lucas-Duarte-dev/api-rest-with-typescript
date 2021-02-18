import {Request, Response} from 'express';
import { getRepository } from 'typeorm'
import { Post } from '../model/Posts';
import { User } from '../model/User';

export const postPosts = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { title, description } = request.body;

        const repository = getRepository(Post);

        const userRepository = getRepository(User);

        const user = await userRepository.findOneOrFail(id, {relations: ['posts']});

        if(!user) {
            return response.status(401).json({ message: "Cannot possibly create post with this user" });
        }

        const createPost = repository.create({ title, description, user });

        
        const posts = await repository.save(createPost);
        
        delete createPost.user;
        
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

export const deletePost = async (request: Request, response: Response) => {
    try {
        const {user_id, post_id} = request.params;
        
        const userRepository = getRepository(User)
        const repository = getRepository(Post)

        const user = await userRepository.findOne(user_id);

        if(!user) {
            return response.status(401).json({ message: "User not found." });
        }

        const post = await repository.findOne(post_id);
        
        if(!post) {
            return response.status(404).json({ message: "Post not found."})
        }

       await repository.delete(post_id);

        return response.status(200).json({ message: "Post deleted." });

    } catch (error) {
        response.status(401).json({ erro: error })
    }
}

export const putPost = async (request: Request, response: Response) => {
    try {
        const {user_id, post_id} = request.params;

        const {title, description} = request.body

        const userRepository = getRepository(User)
        const repository = getRepository(Post)

        const user = await userRepository.findOne(user_id);

        if(!user) {
            return response.status(401).json({ message: "User not found." });
        }

        const post = await repository.findOne(post_id);
        
        if(!post) {
            return response.status(404).json({ message: "Post not found."})
        }

       await repository.update(post_id, {title, description});

       delete post.user
        return response.status(200).json(post);

    } catch (error) {
        response.status(401).json({ erro: error })
    }

}