import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    payload?: JwtPayload;
  }
}
