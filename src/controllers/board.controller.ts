import { networkError, networkSuccess, serverError } from "@middlewares/network.middelware";
import BoardModel from "@schemas/Board.schema";
import CardModel from "@schemas/Cards.schema";
import ProcessModel from "@schemas/Process.schema";
import { Request, Response } from "express";

export default class BoardController {
	constructor(){};

	public async createBoard(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}

			const Board = await BoardModel(x_tenant as string);
			const Process = await ProcessModel(x_tenant as string);

			const process = await Process.findById(req.body.process);

			if(!process) return networkError({res, status: 404, message: 'No existe el proceso para crear el board', error: {}});
			
			const existBoard = await Board.findOne({name: req.body.name, process: process._id});

			if(existBoard) return networkError({res, status: 400, message: 'Ya existe un tablero con el mismo nombre', error: {}});

			const board = new Board(req.body); 

			await board.save();

			//@ts-expect-error
			process.boards.push(board._id);
			await process.save();
			return networkSuccess({res, status: 400, message: 'Board creado correctamente', data: board});
		} catch (error) {
			return serverError({res, error, message: 'Error al crear el board'})
		}
	}

	public async getBoardByProcess(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Board = await BoardModel(x_tenant as string);
			const Card = await CardModel(x_tenant as string);
			const data = await Board.find({process: req.params.id}).populate({path: 'cards', model: Card});
			return networkSuccess({res, status: 200, message: 'Board encontrado correctamente', data});

		} catch (error) {
			return serverError({res, error, message: 'Error al crear el board'})
			
		}
	}

	public async updateBoard(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const {process, id,...body} = req.body;
			const Board = await BoardModel(x_tenant as string);

			if(req.body.name){
				const existBoard = await Board.findOne({name: req.body.name, process});
				if(existBoard) return networkError({res, status: 400, message: 'Ya existe un tablero con el mismo nombre', error: {}}); 
			}
			await Board.updateOne({_id: id}, body);

			return networkSuccess({res, status: 200, message: 'Board actualizado correctamente', data: {}});
		} catch (error) {
			return serverError({res, error, message: 'Error al actualizar el board'})
			
		}
	}
}