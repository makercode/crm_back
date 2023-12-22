import PlansController from "@controllers/plans.controller";
import fieldValidator from "@middlewares/field_validator.middleware";
import { Router } from "express";
import { body } from 'express-validator';

const router = Router();
const plansController = new PlansController();

router.post('/', [
	body("detail").isArray().notEmpty(),
	body("description").isString().notEmpty(),
	body("max_users").isNumeric().isInt({ min: 3 }),
	body("name").isString().notEmpty(),
	body("price").isObject().notEmpty(),
	fieldValidator
], plansController.createPlan);
router.get("/", plansController.getAllPlans);
router.get("/:id", plansController.getPlanById);
router.put("/:id", plansController.updatePlan);
router.delete("/:id", plansController.deletePlan);

export default router;