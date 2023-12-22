import { Router } from "express";
import { body } from "express-validator";
import CardController from "@controllers/card.controller";

import { validateJWT } from "@middlewares/generate_jwt.middleware";
import fieldValidator from "@middlewares/field_validator.middleware";

const router = Router();
const cardController = new CardController();

const validateCard = [
	validateJWT,
	body('name').isString().notEmpty(),
	body('client').isString().notEmpty(),
	body('state').isString().notEmpty(),
	fieldValidator
];

const validateUpdate = [
	validateJWT,
	body('id').isString().notEmpty(),
	fieldValidator
]

router.post('/', validateCard, cardController.createCard);
router.get('/', validateJWT, cardController.getAll);
router.get('/:id', validateJWT, cardController.getCardById);
router.put('/', validateUpdate, cardController.update)

export default router;