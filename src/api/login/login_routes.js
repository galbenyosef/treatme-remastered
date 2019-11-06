import express from 'express';
import passport from 'passport'
import { login } from './login_contoller';
const router = express.Router();

router.post('/',login)

export { router as loginRouter }
