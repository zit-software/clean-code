import authService from '../services/auth.service.js';

class AuthController {
  /**
   * Render the sign-up page
   * @type {import('express').RequestHandler}
   */
  async getSignUp(req, res) {
    res.render('auth/sign-up', {defaultValues: {}});
  }

  /**
   * Handle the sign-up form submission
   * @type {import('express').RequestHandler}
   */
  async postSignUp(req, res) {
    try {
      const createdUser = await authService.signUp(req.body);

      // THIS IS JUST FOR DEMO PURPOSES, IN REAL APPS YOU SHOULD SIGN THE COOKIE WITH A SECRET KEY
      res.cookie('user', createdUser.id, {httpOnly: true}).redirect('/');
    } catch (error) {
      res.status(401).render('auth/sign-up', {error, defaultValues: req.body});
    }
  }

  /**
   * Render the sign-in page
   * @type {import('express').RequestHandler}
   */
  async getSignIn(req, res, next) {
    try {
      res.render('auth/sign-in', {defaultValues: {}});
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handle the sign-in form submission
   * @type {import('express').RequestHandler}
   */
  async postSignIn(req, res) {
    try {
      const user = await authService.signIn(req.body);

      // THIS IS JUST FOR DEMO PURPOSES, IN REAL APPS YOU SHOULD SIGN THE COOKIE WITH A SECRET KEY
      res.cookie('user', user.id, {httpOnly: true}).redirect('/');
    } catch (error) {
      res.status(401).render('auth/sign-in', {error, defaultValues: req.body});
    }
  }

  /**
   * Handle the sign-out request
   * @type {import('express').RequestHandler}
   */
  async getSignOut(req, res, next) {
    try {
      res.clearCookie('user');
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
