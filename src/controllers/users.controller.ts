import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import UserSchema, { GetUserModel } from "@schemas/User.schema";
import { Schema } from 'mongoose';
import { GetCompanyModel } from '@schemas/Company.schema';
import mail_to_name from '@utils/commonMails.util';
import { networkError } from '@middlewares/network.middelware';

export default class UserController {

	public async creaateMainUser (req: Request, res: Response) {
		try {
			const userSchema = await GetUserModel() 
			const user = new userSchema(req.body);
			const salt = bcrypt.genSaltSync();
			user.password = bcrypt.hashSync(req.body.password, salt);
			user.plan = process.env.FREE_PLAN as any as Schema.Types.ObjectId;
			
			const companyName = mail_to_name(user.email);

			const compaanySchema = await GetCompanyModel();
			const company = new compaanySchema({name: companyName, main_account: user._id, subscription: user.plan, phone_number: user.phone });

			await company.save();

			await user.save();

			res.status(201).json(user);

		} catch (error) {
			console.log(error);
			networkError({
				res,
				status: 500,
				message: 'No se pudo crear el usuario',
				error
			})
		}
	}

	public async createUser  (req: Request, res: Response)  {
	  try {
		const { x_tenant } = req.headers;
		
		const userSchema = await GetUserModel();
		const CompanySchema = await GetCompanyModel();

		const user = new userSchema(req.body);
		const company = await CompanySchema.findOne({name: x_tenant});
		
		if(!company){
			res.status(401).send({error: 'La compañiaa no esta registrada para este usuario'});
			return;
		}

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(req.body.password, salt);
		user.plan = process.env.FREE_PLAN as any as Schema.Types.ObjectId;
		await user.save();
		
		//@ts-expect-error
		company.users.push(user._id);
		await company.save();
		res.status(201).json(user);
	  } catch (error) {
		res.status(500).json({error: error, message: 'No se pudo crear el usuario'});

	  }
	};
	
	// Obtener todos los usuarios
	public async getAllUsers  (_: Request, res: Response)  {
	  try {
		const users = await UserSchema.find();
		res.status(200).json(users);
	  } catch (error) {
		res.status(500).json({ error: "No se pudieron obtener los usuarios." });
	  }
	};
	
	// Obtener un usuario por ID
	public async getUserById  (req: Request, res: Response)  {
	  try {
		const user = await UserSchema.findById(req.params.id);
		if (!user) {
		  res.status(404).json({ error: "Usuario no encontrado." });
		} else {
		  res.status(200).json(user);
		}
	  } catch (error) {
		res.status(500).json({ error: "No se pudo obtener el usuario." });
	  }
	};
	
	// Actualizar un usuario por ID
	public async updateUser  (req: Request, res: Response)  {
	  try {

		const updatedUser = await UserSchema.findByIdAndUpdate(
		  req.params.id,
		  req.body,
		  { new: true }
		);
		if (!updatedUser) {
		  res.status(404).json({ error: "Usuario no encontrado." });
		} else {
		  res.status(200).json(updatedUser);
		}
	  } catch (error) {
		res.status(500).json({ error: "No se pudo actualizar el usuario." });
	  }
	};
	
	// Eliminar un usuario por ID
	public async deleteUser  (req: Request, res: Response)  {
	  try {
		const deletedUser = await UserSchema.findByIdAndRemove(req.params.id);
		if (!deletedUser) {
		  res.status(404).json({ error: "Usuario no encontrado." });
		} else {
		  res.status(204).send(); // No Content
		}
	  } catch (error) {
		res.status(500).json({ error: "No se pudo eliminar el usuario." });
	  }
	};
}

