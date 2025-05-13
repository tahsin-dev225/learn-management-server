import express from 'express'
const router = express.Router()
import { generateToken } from './gererateToken.js';


router.post("/", generateToken);

export const jwtRouter = router;