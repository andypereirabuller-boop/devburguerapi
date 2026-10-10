import * as Yup from 'yup';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from './../../config/auth.js';

class SessionController {
  async store(request, response) {
    try {
      const schema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
      });
      const isValid = await schema.isValid(request.body, {
        abortEarly: false,
      });

      const emailOrPasswordIncorrect = () => {
        return response
          .status(400)
          .json({ error: 'E-mail ou senha incorretos!' });
      };

      if (!isValid) {
        return emailOrPasswordIncorrect();
      }

      const { email, password } = request.body;

      const existingUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!existingUser) {
        return emailOrPasswordIncorrect();
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.dataValues.password_hash,
      );

      if (!isPasswordCorrect) {
        return emailOrPasswordIncorrect();
      }

      const token = jwt.sign(
        {
          id: existingUser.id,
          admin: existingUser.admin,
          name: existingUser.name,
        },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        },
      );

      return response.status(200).json({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        admin: existingUser.admin,
        token,
      });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: 'Erro interno do servidor. Tente novamente.' });
    }
  }
}

export default new SessionController();
