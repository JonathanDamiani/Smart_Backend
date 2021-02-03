import { sign } from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';
import { pick } from 'lodash';

export const createToken = (user) => {
    let token = sign (user, JWT_SECRET, { expiresIn : JWT_EXPIRES_IN} );

    return `Bearer ${token}`;
};

export const serializeUser = (user) => {
    return pick(user, ['id', 'username', 'email']);
}
