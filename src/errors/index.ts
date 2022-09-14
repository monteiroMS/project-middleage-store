import { IError } from '../interfaces';

export const InternalServerError: IError = { code: 500, message: 'Internal Server Error' };

export const InvalidFields: IError = { code: 400, message: 'Invalid Fields' };
