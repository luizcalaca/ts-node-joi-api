import { IUser } from "../interfaces/IUser";
import { Pool, ResultSetHeader } from "mysql2/promise";

export default class UserModel {
    public connection: Pool;

    constructor(connection: Pool) {
        this.connection = connection;
    }

    public async getAll(): Promise<IUser[]> {
        const query = 'SELECT * FROM express.users'
        const [users] = await this.connection
            .execute(query)

        return users as IUser[];
    }

    public async getById(id: number): Promise<IUser | null> {
        const query = 'SELECT * FROM express.users WHERE id = ?';
        const values = [id];

        const [data] = await this.connection.execute(query, values);
        const [user] = data as IUser[]

        return user || null
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        const query = 'SELECT * FROM Users WHERE email = ?';
        const values = [email];

        const [data] = await this.connection.execute(query, values);
        const [user] = data as IUser[];

        return user || null;
    }


    public async create(user: IUser): Promise<IUser> {
        const { nome, email, senha } = user;

        const query = 'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)';
        const values = [nome, email, senha];

        const [result] = await this.connection.execute<ResultSetHeader>(query, values);
        const { insertId: id } = result;

        const newUser: IUser = { id, nome, email, senha };
        return newUser;
    }

    public async update(id: number, user: IUser): Promise<IUser> {
        const { nome, email, senha } = user;

        const query = 'UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?';
        const values = [nome, email, senha, id];

        await this.connection.execute(query, values);

        const editedUser: IUser = { id, nome, email, senha };
        return editedUser;
    }

    public async remove(id: number): Promise<IUser | null> {
        const userToBeDeleted = await this.getById(id);
        if (!userToBeDeleted) return null;

        const query = 'DELETE FROM Users WHERE id = ?';
        const values = [id];

        await this.connection.execute(query, values);

        return userToBeDeleted;
    }
}


