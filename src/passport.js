
import {Strategy,ExtractJwt} from 'passport-jwt'
import { config } from './config';
import { UserModel } from '../src/api/users/user_model';
import { AdminModel } from '../src/api/admins/admin_model';

const jwtOptions = {

  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,

}

export const jwtLogin = new Strategy(jwtOptions, async (payload,done) => { 

  const user = await UserModel.findById(payload._id)

  const isAdmin = await AdminModel.findById(payload._id)
  if(user){
      return done(null, {
          id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: !!isAdmin
      });
  }
  return done(null, false);

})
