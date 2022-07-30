import * as userService from '../services/userService';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/IUser';

export async function getAll(_req: Request, res: Response) {
    const result = await userService.getAll();
    res.status(HTTP_STATUS.OK).json(result);
}

export async function getById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const result = await userService.getById(Number(id));

        return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
        next(error)
    }
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body as IUser;
        const result = await userService.create(user);
        return res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
        next(error)
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const user = req.body as IUser;
        const result = await userService.update(Number(id), user);

        return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
        next(error)
    }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const result = await userService.remove(Number(id));

        return res.status(HTTP_STATUS.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const userCredentials = req.body as IUser;
        const result = await userService.login(userCredentials);
        return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
        next(error)
    }

}
