import express from 'express';
import passport from 'passport'
import { getAll, getById, putById, post, deleteById } from './specialities_controller';
const router = express.Router();

router.get('/',getAll)
router.get('/:id',getById)
router.put('/:id',passport.authenticate('jwt',{session: false}),putById)
router.delete('/:id',passport.authenticate('jwt',{session: false}),deleteById)
router.post('/',passport.authenticate('jwt',{session: false}),post)

export { router as specialitiesRouter }