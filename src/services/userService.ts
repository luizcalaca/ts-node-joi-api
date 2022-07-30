import { IUser } from '../interfaces/IUser';
import * as userModel from '../models/userModel'
import HttpException from '../validations/HttpException';
import { validateUser } from '../validations/userValidation';

export async function getAll() {
    const result = await userModel.getAll();
    return result
}

export async function getById(id: number) {
    const result = await userModel.getById(id);

    if (!result)
        throw new HttpException('NotFoundError', 'Pessoa não encontrada cadastrada')
    return result
}

export async function create(user: IUser) {
    validateUser(user)
    const userExists = await userModel.getByEmail(user.email);
    if (userExists)
        throw new HttpException('NotFoundError', 'Pessoa já cadastrada')

    const result = await userModel.create(user);
    return result
}

export async function update(id: number, user: IUser) {
    const userExists = await userModel.getById(id);
    if (!userExists)
        throw new HttpException('NotFoundError', 'Pessoa não existe')

    const result = await userModel.update(id, user);
    return result
}

export async function remove(id: number) {
    const result = await userModel.remove(id);

    if (!result)
        throw new HttpException('NotFoundError', 'Pessoa não existe')
    return result
}


export async function login(userCredentials: IUser) {
    const user = await userModel.getByEmail(userCredentials.email);

    if (!user || user.senha !== userCredentials.senha)
        throw new HttpException('Unauthorized', 'Acesso negado')
    return { data: user, token: { token: 'fake token' } };
}
