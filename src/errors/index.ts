import { IInternalError } from '../interfaces';

export const InternalServerError: IInternalError = { code: 500, message: 'Internal Server Error' };

export default InternalServerError;