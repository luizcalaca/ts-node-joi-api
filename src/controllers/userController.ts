import * as userService from '../services/userService';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/IUser';

export async function getAll(_req: Request, res: Response) {
    const { status, data } = await userService.getAll();
    res.status(status).json(data);
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data, error } = await userService.getById(Number(id));

    return error
        ? res.status(status).json({ error })
        : res.status(status).json(data);
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body as IUser;
        const { status, data, error } = await userService.create(user);
        return error ? res.status(status).json({ error })
            : res.status(status).json(data);
    } catch (error) {
        next(error)
    }
}

export async function update(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body as IUser;

    const { status, data, error } = await userService.update(Number(id), user);

    return error
        ? res.status(status).json({ error })
        : res.status(status).json(data);
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data, error } = await userService.remove(Number(id));

    return error
        ? res.status(status).json({ error })
        : res.status(status).json(data);
}

export async function login(req: Request, res: Response) {
    const userCredentials = req.body as IUser;
    const { status, data, error } = await userService.login(userCredentials);

    return error
        ? res.status(status).json({ error })
        : res.status(status).json(data);
}
