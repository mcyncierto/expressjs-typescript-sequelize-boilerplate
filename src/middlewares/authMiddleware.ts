import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import process from "process";
import { UnauthorizedException } from "../exceptions/unauthorizedException";

/**
 * An array of routes that are excluded from authentication.
 *
 * These routes do not require JWT token validation, and requests to them are not subject
 * to authentication checks performed by the `authenticate` middleware.
 */
const excludedRoutes: string[] = [
  "POST /api/v1/auth/login",
  "GET /api/v1/healthcheck/app",
  "GET /api/v1/healthcheck/db",
  "GET /api/docs/*",
];

/**
 * Middleware function for authenticating API requests using JWT tokens.
 *
 * This middleware verifies the JWT token provided in the request headers and attaches
 * the decoded user data to the request object for future route handlers to access.
 * If the token is missing or invalid, it sends a 401 Unauthorized response.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function to continue the request chain.
 */
export function authenticate(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  if (
    !excludedRoutes.some((route) => {
      const [method, pattern] = route.split(" ");
      // Check if current route matches any of the excluded routes with /* pattern
      if (method === req.method && pattern.endsWith("/*")) {
        const prefix = pattern.slice(0, -2); // Remove "/*" from the end
        return req.path.startsWith(prefix);
      }
      return false;
    }) &&
    !excludedRoutes.includes(`${req.method} ${req.path}`)
  ) {
    // Get the JWT token from the request headers
    const token: string = req.headers.authorization ?? "";

    // Check if the token is present and properly formatted
    if (!token || !token.startsWith("Bearer ")) {
      next(new UnauthorizedException("Unauthenticated"));
    }
    // Extract the token without 'Bearer ' prefix
    const tokenData = token.slice(7);

    try {
      // Verify and decode the JWT token
      const decoded = jwt.verify(tokenData, process.env.JWT_SECRET_KEY!);

      // Attach the decoded user data to the request for future route handlers to access
      req.user = decoded;

      // Call the next middleware or route handler
      return next();
    } catch (error) {
      // If JWT verification fails, send a 401 Unauthorized response
      next(new UnauthorizedException("Unauthenticated"));
    }
  } else {
    return next();
  }
}
