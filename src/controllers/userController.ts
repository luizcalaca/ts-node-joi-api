import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../enums/HttpStatus';
import { IUser } from '../interfaces/IUser';
import UserService from '../services/userService';

export default class UserController {
    constructor(private userService = new UserService()) { }

    public getAll = async (_req: Request, res: Response) => {
        const result = await this.userService.getAll();
        res.status(HTTP_STATUS.OK).json(result);
    }

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.userService.getById(Number(id));

            return res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error)
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.body as IUser;
            const result = await this.userService.create(user);
            return res.status(HTTP_STATUS.CREATED).json(result);
        } catch (error) {
            next(error)
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = req.body as IUser;
            const result = await this.userService.update(Number(id), user);

            return res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error)
        }
    }

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.userService.remove(Number(id));

            return res.status(HTTP_STATUS.OK).json(result)
        } catch (error) {
            next(error)
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userCredentials = req.body as IUser;
            const result = await this.userService.login(userCredentials);
            return res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error)
        }

    }
}
