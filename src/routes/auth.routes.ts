import { Router } from "express";
import { body  } from 'express-validator';

import AuthController from "@controllers/auth.controller";
import fieldValidator from "@middlewares/field_validator.middleware";

const router = Router();
const authController = new AuthController();

router.post('/login', [
	body('email').isEmail().notEmpty(),
	body('password').isString().notEmpty(),
	fieldValidator,
], authController.login);

export default router;