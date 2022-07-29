import { ValidationError } from 'joi';
import { IUser } from '../interfaces/IUser';
import * as userModel from '../models/userModel'
import { validateUser } from '../validations/userValidation';

export async function getAll() {
    const data = await userModel.getAll();
    return { status: 200, data };
}

export async function getById(id: number) {
    const data = await userModel.getById(id);

    if (data === null) return { status: 404, error: { message: 'Pessoa não encontrada' } };
    return { status: 200, data };
}

export async function create(user: IUser) {
    validateUser(user)
    const userExists = await userModel.getByEmail(user.email);
    if (userExists) return { status: 400, error: { message: "Pessoa encontrada e não pode" } };

    const data = await userModel.create(user);
    return { status: 201, data };
}

export async function update(id: number, user: IUser) {
    const userExists = await userModel.getById(id);
    if (!userExists) return { status: 404, error: { message: 'Pessoa não encontrada' } };

    const data = await userModel.update(id, user);

    if (data === null) return { status: 404, error: { message: 'Atualização com algum problema' } };
    return { status: 200, data };
}

export async function remove(id: number) {
    const data = await userModel.remove(id);

    if (data === null) return { status: 404, error: { message: 'Pessoa não encontrada' } };
    return { status: 200, data };
}


export async function login(userCredentials: IUser) {
    const data = await userModel.getByEmail(userCredentials.email);

    if (data === null || data.senha !== userCredentials.senha) {
        return { status: 403, error: { message: 'Não autorizada' } };
    }
    return { status: 200, data: { token: 'fake token' } };
}
