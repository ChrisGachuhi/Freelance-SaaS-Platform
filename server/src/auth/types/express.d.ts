import { JWTPayload } from './index'

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload //extend Request to attach JWT info after token verification
    }
  }
}


//This file tells typescript that if we use req.user it should assume that we know what we are doing
