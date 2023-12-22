import { networkError, networkSuccess, serverError } from '@middlewares/network.middelware';
import ClientModel from '@schemas/Client.schema';
import { Request, Response } from 'express';

export default class ClientController {
	constructor(){}

	public async getAll(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}

			const Client = await ClientModel(x_tenant as string);
			const data = await Client.find();
			return networkSuccess({res,  message: 'Clientes listados correctamente', data});
		} catch (error) {
			serverError({res, error, message: 'Ha ocurrido un problema al obtener el listado de clientes'});
		}
	}

	public async getById(req: Request, res: Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}

			const Client = await ClientModel(x_tenant as string);
			const data = await Client.findById(req.params.id);
			if(!data) return networkError({res, message: 'El cliente no existe', status: 404, error: {}});

			return networkSuccess({res,  message: 'Clientes encontrado', data}); 
		} catch (error) {
			serverError({res, error, message: 'Ha ocurrido un problema al obtener el cliente'});
		}
	}

	public async create(req: Request, res: Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Client = await ClientModel(x_tenant as string);
			const client = new Client(req.body);

			await client.save();

			return networkSuccess({res, message:'Cliente creado correctamente', data: client});

		} catch (error) {
			return serverError({res, error, message: 'Ha ocurrido un problema al crear el cliente'});
		}
	}

	public async update(req: Request, res: Response ) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const {id, ...body} = req.body;
			const Client = await ClientModel(x_tenant as string);

			const client =  await Client.findById(req.body.id);
			
			if(!client) return networkError({res, message: 'El cliente no existe', status: 404, error: {}});
			
			await Client.updateOne({_id: id}, body)

			return networkSuccess({res, data: req.body, message:'Cliente actualizado'});
			
		} catch (error) {
			return serverError({res, error, message: 'Ha ocurrido un problema al actualizar el cliente'});
		}
	}
}