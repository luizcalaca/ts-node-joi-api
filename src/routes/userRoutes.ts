import { Router } from 'express';
import * as userControllers from '../controllers/userController';

const router = Router()

router.post('/login', userControllers.login)
router.get('/', userControllers.getAll);
router.get('/:id', userControllers.getById);
router.delete('/:id', userControllers.remove);

router.post('/', userControllers.create);
router.put('/:id', userControllers.update);

export default router;