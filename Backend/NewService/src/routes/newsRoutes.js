import { Router } from 'express';
import { getNews } from '../controllers/newsControllers.js';

const router = Router();

router.get('/', getNews);

export default router;
