import express from 'express';
import { register } from './register_contoller';
const router = express.Router();

router.post('/',register)

export { router as registerRouter }
