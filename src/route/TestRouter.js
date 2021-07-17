import { Router } from 'express';
import dummyController from '../controller/DummyDataController'

const router = Router();

router.get('/createCollection', dummyController.createCollection)
router.get('/mintToken', dummyController.mintToken)
router.get('/list', dummyController.list)

export default router
