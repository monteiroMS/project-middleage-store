import jwt from 'jsonwebtoken';
import { InvalidFields } from '../errors';
import { IError, ILoginRequest, IUser, IUserCreateRequest } from '../interfaces';
import connection from './connection';

const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'password';

export const getUserByUsername = async (username: string) => {
  const [user] = await connection.execute(`
    SELECT * FROM Trybesmith.Users
    WHERE username = ?;
  `, [username]);

  return user as IUser[];
};

export const login = async (loginReq: ILoginRequest) => {
  try {
    const [{ id, username, password }] = await getUserByUsername(loginReq.username);

    if (loginReq.password !== password) {
      throw new Error();
    }

    const token = jwt.sign({ id, username }, JWT_SECRET, {
      expiresIn: '1d',
    });
  
    return token;
  } catch (error) {
    console.log(error);
    return InvalidFields;
  }
};

export const create = async (
  { username, password, classe, level }: IUserCreateRequest,
): Promise<string | IError> => {
  try {
    const [user] = await connection.execute(`
      INSERT INTO Trybesmith.Users (username, password, classe, level)
      VALUES (?, ?, ?, ?);
    `, [username, password, classe, level]);

    if (!user) throw new Error();

    const token = await login({ username, password });

    return token;
  } catch (error) {
    console.log(error);
    return InvalidFields;
  }
};
