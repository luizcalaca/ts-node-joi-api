import { IUser } from '../interfaces/IUser';
import UserModel from '../models/userModel'
import connection from '../utils/connection';
import HttpException from '../validations/HttpException';
import { validateUser } from '../validations/userValidation';

export default class UserService {
    public userModel: UserModel;

    constructor() {
        this.userModel = new UserModel(connection);
    }

    public getAll = async () => {
        const result = await this.userModel.getAll();
        return result
    }

    public getById = async (id: number) => {
        const result = await this.userModel.getById(id);

        if (!result)
            throw new HttpException('NotFoundError', 'Pessoa não encontrada cadastrada')
        return result
    }

    public create = async (user: IUser) => {
        validateUser(user)
        const userExists = await this.userModel.getByEmail(user.email);
        if (userExists)
            throw new HttpException('NotFoundError', 'Pessoa já cadastrada')

        const result = await this.userModel.create(user);
        return result
    }

    public update = async (id: number, user: IUser) => {
        const userExists = await this.userModel.getById(id);
        if (!userExists)
            throw new HttpException('NotFoundError', 'Pessoa não existe')

        const result = await this.userModel.update(id, user);
        return result
    }

    public remove = async (id: number) => {
        const result = await this.userModel.remove(id);

        if (!result)
            throw new HttpException('NotFoundError', 'Pessoa não existe')
        return result
    }

    public login = async (userCredentials: IUser) => {
        const user = await this.userModel.getByEmail(userCredentials.email);

        if (!user || user.senha !== userCredentials.senha)
            throw new HttpException('Unauthorized', 'Acesso negado')
        return { data: user, token: { token: 'fake token' } };
    }
}
