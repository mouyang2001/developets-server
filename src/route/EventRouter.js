import { Router } from 'express';
import eventController from '../controller/EventController';

const router = Router();

router.post('/github-hook', eventController.githubEvent);


export default router;
