import connection from "../utils/connection";
import { IUser } from "../interfaces/IUser";
import { ResultSetHeader } from "mysql2";

export async function getAll(): Promise<IUser[]> {
    const query = 'SELECT * FROM express.users'
    const [users] = await connection.execute(query)

    return users as IUser[];
}

export async function getById(id: number): Promise<IUser | null> {
    const query = 'SELECT * FROM express.users WHERE id = ?';
    const values = [id];

    const [data] = await connection.execute(query, values);
    const [user] = data as IUser[]

    return user || null
}

export async function getByEmail(email: string): Promise<IUser | null> {
    const query = 'SELECT * FROM Users WHERE email = ?';
    const values = [email];

    const [data] = await connection.execute(query, values);
    const [user] = data as IUser[];

    return user || null;
}


export async function create(user: IUser): Promise<IUser> {
    const { nome, email, senha } = user;

    const query = 'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)';
    const values = [nome, email, senha];

    const [result] = await connection.execute<ResultSetHeader>(query, values);
    const { insertId: id } = result;

    const newUser: IUser = { id, nome, email, senha };
    return newUser;
}

export async function update(id: number, user: IUser): Promise<IUser> {
    const { nome, email, senha } = user;

    const query = 'UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?';
    const values = [nome, email, senha, id];

    await connection.execute(query, values);

    const editedUser: IUser = { id, nome, email, senha };
    return editedUser;
}

export async function remove(id: number): Promise<IUser | null> {
    const userToBeDeleted = await getById(id);
    if (!userToBeDeleted) return null;

    const query = 'DELETE FROM Users WHERE id = ?';
    const values = [id];

    await connection.execute(query, values);

    return userToBeDeleted;
}


