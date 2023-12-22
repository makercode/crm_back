import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { networkError, serverError } from './network.middelware';


function generateJWT(uid: string, main: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const payload = {uid, main};
		jwt.sign(payload, process.env.JWT_KEY!, {expiresIn: '30d'}, (err, encoded) => {
			if(err){
				console.error('JWT GENERATIOON ERROR: ', err);
				reject(err);
				return;
			}
			resolve(encoded!);
		})
	});
}

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers;
		if(!authorization){
			return networkError({
				res, status: 401, 
				message: 'Faltan credenciales o usuario no conocido',
				error: {}
			});
		}

		const token = authorization.replace('Bearer ', '');
		const { uid, main }: any = jwt.verify(token, process.env.JWT_KEY!)
		
		//@ts-ignore
		req.uid = uid;
		req.headers.x_tenant = main; 

		next();
		
	} catch (error) {
		serverError({res, message: 'Ha ocurrido un error', error});
	}
}

export default generateJWT;

export { validateJWT };