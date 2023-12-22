import { Router } from "express";
import { body } from "express-validator";
import ClientController from "@controllers/client.controller";
import { validateJWT } from "@middlewares/generate_jwt.middleware";
import fieldValidator from "@middlewares/field_validator.middleware";

const router = Router();
const clientController = new ClientController();

const validateClient = [
	validateJWT,
	body('name').isString().notEmpty(),
	body('email').isString().notEmpty(),
	body('last_name').isString().notEmpty(),
	body('phone').isString().notEmpty(),
	fieldValidator
]
const validateUpdate = [
	validateJWT,
	body('id').isString().notEmpty(),
	fieldValidator
]

router.post('/', validateClient, clientController.create);
router.get('/', validateJWT, clientController.getAll);
router.get('/:id', validateJWT, clientController.getById);
router.put('/', validateUpdate, clientController.update);

export default router;