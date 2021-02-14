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
      const repository = getRepository(User);
    
    
      const userAlreadyExists = await repository.findOne({ where:{ email } })
    
      if(userAlreadyExists) { 
        return response.status(409).json({error: "This user already exists."})
      }
      const user = repository.create({ email, password })
    
      await repository.save(user);
    
      return response.json(user);
    } catch (error) {
        response.status(401).json({ error: "Cannot create user." })
    }
}

export const putEmail = async (request: Request, response: Response) => {
    const { user_id } = request.params;
    const { email } = request.body;
    try {
      const repository = getRepository(User);

      const UserEmail = await repository.update(user_id, { email });

      if(UserEmail.affected !== 1) {
        return response.status(404).json({message: 'User not found'})
      }
    
      const UpdateUserEmail = await repository.findOne(user_id);
      return response.json(UpdateUserEmail);
    } catch (error) {
      response.status(401).json({Message: "Cannot update user email."});
    }
}

export const deleteUser = async (request: Request, response: Response) => {
  const { user_id } = request.params;

  const repository = getRepository(User);
  
  const user = await repository.findOne(user_id);

  if(!user) {
    response.status(401).json({ message: "User not found!" });
  }

  await repository.delete(user_id);

  return response.json({ message: "User deleted!" });
}