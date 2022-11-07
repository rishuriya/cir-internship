import { Middleware } from 'next-api-route-middleware';
import cookie from 'js-cookie';

export type User = { userId: string };

export const userAuth: Middleware = async (req, res, next) => {
  // const authCookie = await getUserByCookie();
  const authCookie = cookie.get("token");

  if (authCookie) {
    
    next();
  } else {
    res.status(401).send({ message: 'Invalid auth cookie.' });
  }
};

export default use(allowMethods['GET'], handler);