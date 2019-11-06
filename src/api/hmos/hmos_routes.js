import express from 'express';
import passport from 'passport'
import { getAll, getById, putById, post, deleteById,deleteManyById } from './hmos_controller';
const router = express.Router();

router.get('/',passport.authenticate('jwt',{session: false}),getAll)
router.get('/:id',passport.authenticate('jwt',{session: false}),getById)
router.put('/:id',passport.authenticate('jwt',{session: false}),putById)
router.delete('/',passport.authenticate('jwt',{session: false}),deleteManyById)
router.delete('/:id',passport.authenticate('jwt',{session: false}),deleteById)
router.post('/',passport.authenticate('jwt',{session: false}),post)

export { router as hmosRouter }