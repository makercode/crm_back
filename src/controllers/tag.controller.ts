import { networkError, networkSuccess, serverError } from '@middlewares/network.middelware';
import TagModel from '@schemas/Tags.schema';
import { Request, Response } from 'express';

export default class TagController {
	constructor(){}

	public async getAll(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Tag = await TagModel(x_tenant as string);
			const data = await Tag.find();

			return networkSuccess({res, message:'Etiquetas listadas correctamente', data});
		} catch (error) {
			serverError({res, message: 'Ha ocurrido un problema al listar las etiquetas', error});
		}
	}

	public async getBy(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Tag = await TagModel(x_tenant as string);
			const { name, id } = req.query;
			const data = await Tag.find({$or: [
				{name},
				{ _id: id}
			]});
			return networkSuccess({res, message:'Etiquetas listadas correctamente', data});
		} catch (error) {
			serverError({res, message: 'Ha ocurrido un problema al listar las etiquetas', error});
		}
	}

	public async create(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Tag = await TagModel(x_tenant as string);
			const tag = new Tag(req.body);
			await tag.save();
			return networkSuccess({res, message:'Etiquetas listadas correctamente', data: tag});
		} catch (error) {
			serverError({res, message: 'Ha ocurrido un problema al crear la etiqueta', error});
		}
	}

	public async updateTag(req: Request, res: Response){
		try {
			console.log("Boddy");
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const {id, ...body} = req.body;
			console.log("Boddy");
			const Tag = await TagModel(x_tenant as string);
			const data = await Tag.findOneAndUpdate({_id: id}, body, {new: true});
			if(!data) return networkError({error: {}, message: 'La etiqueta no ha sido encontrada', res, status: 404});
			return networkSuccess({res, message: 'Etiqueta actualizada', data });
		} catch (error) {
			console.log(error);
			serverError({res, message: 'Ha ocurrido un problema al crear la etiqueta', error});
		}
	}

	public async deleted(req: Request, res: Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Tag = await TagModel(x_tenant as string);
			const { id } = req.params;
			await Tag.deleteOne({_id: id});
			return networkSuccess({res, message: 'Etiqueta elimiinada', data:{}});
		} catch (error) {
			serverError({res, message: 'Ha ocurrido un problema al crear la etiqueta', error});
		}
	}
}