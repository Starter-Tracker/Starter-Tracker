import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { register, login } from '../controllers/authController';

const router = Router();

// Middleware para lidar com erros de validação
const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Rota de registro de usuário com validação
router.post(
    '/register',
    [
        check('username', 'O nome de usuário é obrigatório').not().isEmpty(),
        check('email', 'Por favor, insira um email válido').isEmail(),
        check('password', 'A senha deve ter pelo menos 8 caracteres').isLength({ min: 8 }),
        validate, // Middleware para verificar erros de validação
    ],
    register
);

// Rota de login
router.post(
    '/login',
    [
        check('email', 'Por favor, insira um email válido').isEmail(),
        check('password', 'A senha é obrigatória').not().isEmpty(),
        validate,
    ],
    login
);

export default router;