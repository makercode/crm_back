import { Router } from 'express';
import { body } from 'express-validator';

import { validateJWT } from '@middlewares/generate_jwt.middleware';
import fieldValidator from '@middlewares/field_validator.middleware';
import ClientBusiness from '@controllers/client_business.controller';

const business = new ClientBusiness();
const router = Router();

const validateBusiness = [
	validateJWT,
	body('name').isString().notEmpty(),
	body('phone').isString().notEmpty(),
	body('doc_number').isString().notEmpty(),
	fieldValidator
];

const validateUpdate = [
	validateJWT,
	body('id').isString().notEmpty(),
	fieldValidator
]

router.post('/', validateBusiness, business.createBusiness);
router.get('/', validateJWT, business.getAll);
router.get('/:id', validateJWT, business.getById);
router.put('/', validateUpdate, business.updateBusiness);

export default router;