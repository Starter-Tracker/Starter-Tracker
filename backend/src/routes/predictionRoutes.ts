import { Router } from 'express';
import { predictRole } from '../controllers/predictionController';

const router = Router();

router.post('/predict', predictRole);

export default router;
