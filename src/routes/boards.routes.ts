import { Router } from 'express';
import { body } from 'express-validator';
import BoardController from '@controllers/board.controller';

import { validateJWT } from '@middlewares/generate_jwt.middleware';
import fieldValidator from '@middlewares/field_validator.middleware';

const router = Router();
const board = new BoardController();

const validateBoard = [
	validateJWT,
	body('name').isString().notEmpty(),
	body('process').isString().notEmpty(),
	fieldValidator
]

const validateBoardUpdate = [
	validateJWT,
	body('id').isString().notEmpty(),
	body('process').isString().notEmpty(),
	fieldValidator
]

router.get('/process/:id', validateJWT, board.getBoardByProcess)
router.post('/', validateBoard, board.createBoard);
router.put('/', validateBoardUpdate, board.updateBoard);

export default router;