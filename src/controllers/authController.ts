import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

class AuthController {
  /**
   * User authentication using JWT (JSON Web Token).
   *
   * This function handles authentication by receiving a username and password in the request body,
   * and then delegates the authentication process to the AuthService. Upon successful authentication,
   * it sends a 200 OK response with the authentication result.
   *
   * @param {Request} req - The Express request object.
   * @param {string} req.body.username - The username of the user.
   * @param {string} req.body.password - The password of the user.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function to handle errors.
   * @returns {Promise<void>} - A promise that resolves once the response is sent.
   */
  static async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const auth = await AuthService.authenticate(
        req.body?.username,
        req.body?.password
      );

      res.status(200).json(auth);
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
