import { Request, Response } from "express";
import { networkError, networkSuccess, serverError } from "@middlewares/network.middelware";
import ActivitiesModel from "@schemas/Activities.schema";
import dayjs from "dayjs";

export default class ActivityController {
	constructor(){}

	public async createActivity(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}

			const Activity = await ActivitiesModel(x_tenant as string);
			const activity = new Activity({...req.body, date: dayjs()});
			await activity.save();
			return networkSuccess({res, status: 201, message: 'Actividad creada correctamente', data: activity});
		} catch (error) {
			return serverError({res, message: 'Ha ocurrido un error al crear la actividad', error});
		}
	}

	public async getActivitiesByCard(req: Request, res: Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}

			const { card } = req.query;
			const Activity = await ActivitiesModel(x_tenant as string);
			const data = await Activity.find({related_by: card});
			return networkSuccess({res, message: 'Lista de actividades satisfactoria', data})
		} catch (error) {
			return serverError({res, message: 'Ha ocurrido un error al crear la actividad', error});
		}
	}

	public async getById(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}

			const { id } = req.params;
			const Activity = await ActivitiesModel(x_tenant as string);
			
			const data = await Activity.findById(id);

			if(!data){
				return networkError({res, status: 404, message: 'La actividad no existe', error: {}});
			}
			return networkSuccess({res, message: 'Actividad encontrada', data});
		} catch (error) {
			return serverError({res,  message: 'Ha ocurrido un error al obtener la actividad', error});
			
		}
	}

	public async getAll(req: Request, res:Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Activity = await ActivitiesModel(x_tenant as string);

			const data = await Activity.find();
			return networkSuccess({res, message: 'Actividades listadas', data});
			
		} catch (error) {
			return serverError({res,  message: 'Ha ocurrido un error al obtener la actividad', error});
		}
	}

	public async update(req: Request, res: Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const {id, ...body} = req.body;
			const Activity = await ActivitiesModel(x_tenant as string);
			const data = await Activity.findOneAndUpdate({_id: id}, body, {new : true});
			if(!data) return networkError({error: {}, status: 404, message: 'Actividad no encontrada', res});

			return networkSuccess({res, message: 'Actividad actualizada correctamente', data});
		} catch (error) {
			return serverError({res,  message: 'Ha ocurrido un error al obtener la actividad', error});
		}
	}
}