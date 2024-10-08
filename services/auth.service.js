import User from '../models/user.js';

class AuthService {
  /**
   * Signs up a new user
   * @param {object} signup_payload
   * @param {string} signup_payload.username
   * @param {string} signup_payload.password
   * @param {string} signup_payload.confirmPassword
   */
  async signUp(signup_payload) {
    if (signup_payload.username) {
      if (signup_payload.password) {
        const existingUser = await User.findOne({
          where: {username: signup_payload.username},
          raw: true,
        });

        if (!existingUser) {
          if (signup_payload.password.length >= 6) {
            if (signup_payload.password === signup_payload.confirmPassword) {
              return await User.create(
                {
                  username: signup_payload.username,

                  // THIS IS JUST FOR DEMO PURPOSES, IN A REAL APP YOU SHOULD HASH THE PASSWORD BEFORE SAVING IT TO THE DATABASE
                  password: signup_payload.password,
                },
                {raw: true}
              );
            } else {
              throw new Error('Password and confirm password do not match');
            }
          } else {
            throw new Error('Password must be at least 6 characters long');
          }
        } else {
          throw new Error('User already exists');
        }
      } else {
        throw new Error('Password is required');
      }
    } else {
      throw new Error('Username is required');
    }
  }

  /**
   * Signs in a existing user
   * @param {object} loginPayload
   * @param {string} loginPayload.username
   * @param {string} loginPayload.password
   */
  async signIn(loginPayload) {
    if (loginPayload.username) {
      if (loginPayload.password) {
        const user = await User.findOne({
          where: {username: loginPayload.username},
          raw: true,
        });

        if (user) {
          // THIS IS JUST FOR DEMO PURPOSES, IN A REAL APP YOU SHOULD HASH THE PASSWORD BEFORE COMPARING IT
          if (user.password === loginPayload.password) {
            return user;
          } else {
            throw new Error('Password is incorrect');
          }
        } else {
          throw new Error('User not found');
        }
      } else {
        throw new Error('Password is required');
      }
    } else {
      throw new Error('Username is required');
    }
  }
}

export default new AuthService();
