
import express from 'express';

import auth from '../controllers/auth';
import { validRegistration } from '../middleware/valid';

const router = express.Router()

router.post('/register', validRegistration, auth.register)

export default router
