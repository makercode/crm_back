import { Request, Response } from "express";
import { networkError, networkSuccess, serverError } from "@middlewares/network.middelware";
import ClientBusinessModel from "@schemas/ClientCompany.schema";

export default class ClientBusiness {
	constructor(){}

	public async createBusiness(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Business = await ClientBusinessModel(x_tenant as string);
			const business = new Business(req.body);
			await business.save();
			return networkSuccess({res, status: 201, message: 'Negocio creado correctamente', data: business});
		} catch (error) {
			return serverError({res, message: 'Ha ocurrido un error al crear el negocio', error});
		}
	}

	public async getAll(req: Request, res: Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Business = await ClientBusinessModel(x_tenant as string);
			const data = await Business.find();
			return networkSuccess({res, message: 'Negocios listados correctamente', data});
		} catch (error) {
			return serverError({res, message: 'Ha ocurrido un error al listar los negocios', error});
		}
	}

	public async getById(req: Request, res: Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Business = await ClientBusinessModel(x_tenant as string);
			const business = await Business.findById(req.params.id);
			if(!business) return networkError({res, status: 404, message: 'No se encontro el negocio', error: {}});

			return networkSuccess({res, message: 'Negocio encontrado satisfactoriamente', data: business})
		} catch (error) {
			return serverError({res, message: 'Ha ocurrido un error al buscar el negocio', error});
			
		}
	}

	public async updateBusiness(req: Request, res: Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}

			const { id, ...body} = req.body

			const Business = await ClientBusinessModel(x_tenant as string);
			await Business.updateOne({_id: id}, body);

			return networkSuccess({res, message: 'Negocio actualizado correctamente', data: req.body})
		} catch (error) {
			return serverError({res, message: 'Ha ocurrido un error al buscar el negocio', error});
		}
	}
}