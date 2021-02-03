import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { User } from '../models';

const AuthMiddleware = async (req, res, next) => {
    const authHeader = req.get ("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    let token = authHeader.split(' ')[1];

    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }

    let decodedToken; 

    try {
        decodedToken = verify (token, JWT_SECRET);

    } catch (error) {
        req.isAuth = false;
        return next();
    }

    let authUser = await User.findById(decodedToken.id);

    if (!authUser) {
        req.isAuth = false;
        return next();
    }

    req.user = authUser;
    req.isAuth = true;

    return next();
}

export default AuthMiddleware;
