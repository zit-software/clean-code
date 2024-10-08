import User from '../models/user.js';

/**
 * @type {import('express').RequestHandler}
 */
export async function requireLogin(req, res, next) {
  try {
    const userId = req.cookies.user;
    if (!userId) throw new Error('User not found');

    const user = await User.findByPk(userId, {
      raw: true,
    });
    if (!user) throw new Error('User not found');

    res.locals.user = user;
    next();
  } catch {
    res.status(401).redirect('/auth/sign-in');
  }
}
