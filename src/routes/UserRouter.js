import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/login', UserController.loginUser);
router.post('/register', UserController.RegisterUser);
router.get('/protected-route', UserController.authenticateToken, (req, res) => {
    res.json({ message: "Você acessou uma rota protegida!" });
});

export default router;