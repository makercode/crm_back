import { Router } from "express";
import { body } from 'express-validator';
import ProcessController from "@controllers/process.controllert";
import { validateJWT } from "@middlewares/generate_jwt.middleware";
import fieldValidator from "@middlewares/field_validator.middleware";

const processController = new ProcessController();

const router = Router();

const validateProcess = [
	body('name').isString().notEmpty(),
	fieldValidator
];

const validateUpdate = [
	body('id').isString().notEmpty(),
	body('name').isString().notEmpty(),
	fieldValidator
]

router.post('/', [validateJWT, ...validateProcess], processController.createProcess);
router.get('/', [validateJWT], processController.getAll);
router.get('/search', [validateJWT], processController.getByName);
router.put('/', [validateJWT, ...validateUpdate], processController.updateName);

export default router;