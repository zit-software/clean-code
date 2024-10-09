import User from '../models/user.js';

const MIN_PASSWORD_LENGTH = 6;

class AuthService {
  /**
   * Signs up a new user
   * @param {object} signUpPayload
   * @param {string} signUpPayload.username
   * @param {string} signUpPayload.password
   * @param {string} signUpPayload.confirmPassword
   */
  async signUp(signUpPayload) {
    if (!signUpPayload.username) throw new Error('Username is required');
    if (!signUpPayload.password) throw new Error('Password is required');

    if (signUpPayload.password.length < MIN_PASSWORD_LENGTH)
      throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);

    if (signUpPayload.password !== signUpPayload.confirmPassword)
      throw new Error('Password and confirm password do not match');

    const existingUser = await User.findOne({
      where: {username: signUpPayload.username},
      raw: true,
    });
    if (existingUser) throw new Error('User already exists');

    return User.create(
      {
        username: signUpPayload.username,
        password: signUpPayload.password,
      },
      {raw: true}
    );
  }

  /**
   * Signs in a existing user
   * @param {object} loginPayload
   * @param {string} loginPayload.username
   * @param {string} loginPayload.password
   */
  async signIn(loginPayload) {
    if (!loginPayload.username) throw new Error('Username is required');
    if (!loginPayload.password) throw new Error('Password is required');

    const user = await User.findOne({
      where: {username: loginPayload.username},
      raw: true,
    });
    if (!user) throw new Error('User not found');

    if (user.password !== loginPayload.password) throw new Error('Password is incorrect');
    return user;
  }
}

export default new AuthService();
