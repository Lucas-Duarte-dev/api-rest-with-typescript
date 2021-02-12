import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../model/User';

export const getUser = async (request: Request, response: Response) => {
    const user = await getRepository(User).find();

    return response.json(user)
}

export const postUser = async (request: Request, response: Response) => {
    const { email, password } = request.body;
    try {
      const createUser = getRepository(User);
    
    
      const userAlreadyExists = await createUser.findOne({ where:{ email } })
    
      if(userAlreadyExists) { 
        return response.status(409).json({error: "This user already exists."})
      }
      const user = createUser.create({ email, password })
    
      await createUser.save(user);
    
      return response.json(user);
    } catch (error) {
        response.status(401).json({ error: "Cannot create user." })
    }
}