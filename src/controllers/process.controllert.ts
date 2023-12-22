import { Request, Response } from "express";
import ProcessModel from "@schemas/Process.schema";
import { networkError, networkSuccess, serverError } from "@middlewares/network.middelware";
import BoardModel from "@schemas/Board.schema";
import CardModel from "@schemas/Cards.schema";

export default class ProcessController {
	constructor(){}

	public async createProcess(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}

			const Process = await ProcessModel(x_tenant as string)
			
			const process = new Process(req.body);
			await process.save();
			return res.status(201).send({data: process});
		} catch (error) {
			res.status(500).send({error, message: 'Ha ocurrido un  erro al crear el proceso'});
		}
	}

	public async getAll(req: Request, res: Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Process = await ProcessModel(x_tenant as string);
			const Board = await BoardModel(x_tenant as string);
			const Card = await CardModel(x_tenant as string);
			const data = await Process.find().populate({path: 'boards', model: Board, populate: {path: 'cards', model: Card}});
			return networkSuccess({res, status: 200, message: 'Lista de procesos', data});
		} catch (error) {
			console.log(error);
			return serverError({res, message: 'ha ocurrido un error al obtener los procesos', error});
		}
	}

	public async getByName(req: Request, res: Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const { name } = req.query;
			const Process = await ProcessModel(x_tenant as string);
			const Board = await BoardModel(x_tenant as string);
			console.log("TENANT: ", x_tenant)
			await BoardModel(x_tenant as string);
			const data = await Process.findOne({name});
			if(!data){
				return networkError({res, status: 404, message: 'No se ha encontrado el proceso', error: {}});
			}
			const boards = await Board.find({process: data._id});
			//@ts-expect-error
			return networkSuccess({res, status: 200, message: 'Proceso encontrado correctamente', data: {...data._doc, boards}});
		} catch (error) {
			console.log(error)
			return serverError({res, message: 'ha ocurrido un error al obtener los procesos', error});
		}
	}

	public async updateName(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Process = await ProcessModel(x_tenant as string);
			await Process.updateOne({_id: req.body.id}, {name: req.body.name});
			return networkSuccess({res, message: 'Se actualizó el proceso correctamente ', data: {name: req.body.name}});
		} catch (error) {
			return serverError({res, message: 'Ha ocurrido un error al actualizar', error});
		}
	}
}