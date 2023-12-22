import generateJWT from '@middlewares/generate_jwt.middleware';
import { GetCompanyModel } from '@schemas/Company.schema';
import { GetUserModel } from '@schemas/User.schema';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

export default class AuthController {
	constructor(){}

	public async login(req: Request, res: Response) {
		try {
			const {email, password} = req.body;
			const UserSchema = await GetUserModel();
			const CompanySchema = await GetCompanyModel();

			const user = await UserSchema.findOne({email});
			if(!user){
				res.status(401).json({error: 'El usuario no existe'});
				return;
			}
			const company = await CompanySchema.findOne({$or: [
				{main_account: user._id},
				{users: user._id}
			]})

			if(!company){
				res.status(401).json({error: 'El usuario no existe'});
				return;
			}

			const isPasswordValid = bcrypt.compareSync(password, user.password);
			if(!isPasswordValid){
				res.status(400).json({error: 'Usuario o contraseña incorrecto'});
				return;
			}
			const token = await generateJWT(user._id, company.name);
			res.status(200).json({token, message: 'Usuario autenticado correctamente', company});
			return;
		} catch (error) {
			res.status(500).json({error: 'Ha ocurrido un error al iniciar sesión',  motive: error})
		}
	}
}