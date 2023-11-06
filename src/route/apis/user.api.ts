import express from 'express'
const router = express.Router()
import userController from '../../controllers/user.controller'

router.post('/', userController.register)
router.post('/login', userController.login)
router.get('/', userController.findAllUsers)
router.get('/:id', userController.findById)

export default router;