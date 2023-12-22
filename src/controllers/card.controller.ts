import { networkError, networkSuccess, serverError } from "@middlewares/network.middelware";
import BoardModel from "@schemas/Board.schema";
import CardModel from "@schemas/Cards.schema";
import { Request, Response } from "express";

export default class CardController {
	constructor(){}

	public async createCard(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}

			const Card = await CardModel(x_tenant as string);
			const Board = await BoardModel(x_tenant as string);

			const board = await Board.findById(req.body.state);
			if(!board){
				return networkError({res, status:404, message: 'El estado no es válido', error: {}});
			}
			const card = new Card(req.body);

			await card.save();
			//@ts-expect-error
			board.cards.push(card._id);
			await board.save();
			return networkSuccess({res,status: 201 ,message: 'Tarjeta creada correctamente', data: card})

		} catch (error) {
			return serverError({res, error, message: 'Ha ocurrido un error al crear la tarjeta'})
		}
	}

	public async getAll(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Card = await CardModel(x_tenant as string);
			const data = await Card.find();

			return networkSuccess({res, message: 'Tarjetas listadas correctamente', data})
		} catch (error) {
			return serverError({res, error, message: 'Ha ocurrido un error al crear la tarjeta'})
		}
	}

	public async getCardById(req: Request, res: Response){
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			const Card = await CardModel(x_tenant as string);
			const card = await Card.findById(req.params.id);
			if(!card){
				return networkError({res, status:404, message: 'la tarejta no existe', error: {}});
			}
			return networkSuccess({res, status: 200, message: 'Tarjeta encontrada satisfactoriamente', data: card})
		} catch (error) {
			return serverError({res, error, message: 'Ha ocurrido un error al buscar la tarjeta'});
		}
	}

	public async update(req: Request, res: Response) {
		try {
			const { x_tenant } = req.headers;
			if(!x_tenant) {
				res.status(401).send({message: 'Cuenta no encontrada'});
				return;
			}
			let data: unknown;
			const {id, state, ...body} = req.body;
			const Card = await CardModel(x_tenant as string);
			const card = await Card.findById(id);
			if(!card){
				return networkError({res, status:404, message: 'la tarejta no existe', error: {}});
			}
			if(state == card.state || !state){
				data = await Card.findOneAndUpdate({_id: id}, body, {new: true})
			}else {
				const Board = await BoardModel(x_tenant as string);
				const oldBoard = await Board.findById(card.state);
				const newBoard = await Board.findById(state);
				
				if(!oldBoard ||!newBoard){
					return networkError({res, status:404, message: 'el nuevo estado de la tarjeta no existe', error: {}});
				}
				oldBoard.cards.splice(oldBoard.cards.indexOf(state), 1);
				//@ts-expect-error
				newBoard.cards.push(card._id);
				await oldBoard.save();
				await newBoard.save();
				data = await Card.findOneAndUpdate({_id: id}, {state, body}, {new: true})
				
			}

			return networkSuccess({res, status: 200, message: 'Tarjeta aactualizada satisfactoriamente', data})
		} catch (error) {
			return serverError({res, error, message: 'Ha ocurrido un error al buscar la tarjeta'});
		}
	}
}