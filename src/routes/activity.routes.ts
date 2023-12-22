import { Router } from "express";
import { body } from "express-validator";
import ActivityController from "@controllers/activities.controller";
import { validateJWT } from "@middlewares/generate_jwt.middleware";
import fieldValidator from "@middlewares/field_validator.middleware";

const router = Router();
const activity = new ActivityController();

const validateActivity = [
	validateJWT,
	body('name').isString().notEmpty(),
	body('related_by').isString().notEmpty(),
	body('type').isString().notEmpty(),
	fieldValidator
];

const validateUpdate = [
	validateJWT,
	body('id').isString().notEmpty(),
	fieldValidator
]

router.post('/', validateActivity, activity.createActivity);
router.get('/search', validateJWT, activity.getActivitiesByCard);
router.get('/:id', validateJWT, activity.getById);
router.get('/', validateJWT, activity.getAll);
router.put('/', validateUpdate, activity.update)

export default router;