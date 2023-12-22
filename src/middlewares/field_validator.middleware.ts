import { Request, Response, NextFunction } from 'express';
import { validationResult } from "express-validator";
import { networkError } from './network.middelware';

const fieldValidator = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	console.log(req.body);
	console.log("validator", errors.mapped())
	if( !errors.isEmpty() ){
		const keys = Object.keys(errors.mapped());
		const errorObject = keys.map((param) => {
			return {
				campo: param,
				mensaje: errors.mapped()[param].msg
			}
		});
		networkError({
			res,
			status: 400,
			message: 'Los siguientes campos son invalidos o estan vacios:',
			error: errorObject
		});
		return;
	}

	next();

}

export default fieldValidator;