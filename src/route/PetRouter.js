import { Router } from 'express';
import petController  from '../controller/PetController';

const router = Router();

router.get('', petController.view);
router.post('', petController.savePetState)


export default router
