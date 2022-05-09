import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { error, check } from '../../utils/utils.js';

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const userId = jwt.verify(token, process.env.privateKey).id;
    const user = await User.findById(userId);
    res.locals.user = user;
    check(user, 'unauthorized', 401);
    check(user.organisation, 'unauthorized', 401);
    next();
  } catch (e) {
    error(res, e);
  }
};
