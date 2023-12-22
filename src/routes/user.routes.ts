import UserController from "@controllers/users.controller";
import fieldValidator from "@middlewares/field_validator.middleware";
import { Router } from "express";
import { body } from 'express-validator';

const userController = new UserController();

const router = Router();
const validateUser = [
	body("email").isEmail(),
	body("name").isString().notEmpty(),
	body("password").isString().isLength({ min: 6 }),
	body("permissions").isArray(),
	body("phone").isString().notEmpty(),
	fieldValidator
  ];
  
  router.post("/", validateUser, userController.creaateMainUser);
  router.post('/account', validateUser, userController.createUser);
  router.get("/", userController.getAllUsers);
  router.get("/:id", userController.getUserById);
  router.put("/:id", userController.updateUser);
  router.delete("/:id", userController.deleteUser);
  
  export default router;