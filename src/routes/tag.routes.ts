import { Router } from "express";
import { body } from "express-validator";
import TagController from "@controllers/tag.controller";
import { validateJWT } from "@middlewares/generate_jwt.middleware";
import fieldValidator from "@middlewares/field_validator.middleware";
const router = Router();

const taagController = new TagController();

const validateTag =  [
	validateJWT,
	body('name').isString().notEmpty(),
	fieldValidator
]

const vaidateUpdate = [
	validateJWT, 
	body('id').isString().notEmpty(), fieldValidator]


router.post('/', validateTag,  taagController.create);
router.get('/', validateJWT, taagController.getAll);
router.get('/search', validateJWT, taagController.getBy);
router.put('/', vaidateUpdate, taagController.updateTag);
router.delete('/:id', validateJWT, taagController.deleted);


export default router;