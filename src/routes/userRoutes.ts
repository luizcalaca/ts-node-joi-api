import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router()
const usercontroller = new UserController()

router.post('/login', usercontroller.login)
router.get('/', usercontroller.getAll);
router.get('/:id', usercontroller.getById);
router.delete('/:id', usercontroller.remove);

router.post('/', usercontroller.create);
router.put('/:id', usercontroller.update);

export default router;