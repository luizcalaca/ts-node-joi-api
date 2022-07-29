import Joi, { ValidationResult } from 'joi'
import { IUser } from '../interfaces/IUser'

export const validateUser = (data: IUser): ValidationResult => {
    const schema = Joi.object({
        email: Joi.string().email().required()
            .messages(
                { 'string.min': 'Email não pode ser vazio e deve ter ao menos 3 caracteres' },
            ),
        nome: Joi.string().required().min(3).messages(
            { 'string.min': 'Nome não pode ser vazio, mínimo 3 caracteres' },
        ),
        senha: Joi.string().min(6).max(12).required()
            .messages(
                {
                    'string.min': 'Password não vazio e ter entre 3 e 12 caracteres',
                },
            ),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
};