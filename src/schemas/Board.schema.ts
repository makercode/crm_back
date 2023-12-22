import { getTenantDb } from "@database/tenant.connection";
import { Schema, Model, SchemaTypes } from "mongoose";
import Board from "types/Board.interface";

const BoardSchema = new Schema<Board, Model<Board>>({
	name: {
		type: String,
		required: true
	},
	cards: [{
		type: SchemaTypes.ObjectId,
		ref: 'Card'
	}],
	color: {
		type: String,
		default: '#55AC79'
	},
	process: {
		type: SchemaTypes.ObjectId,
		ref: 'Process',
		required: true
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

const BoardModel = async (id: string) => {
	try {
		const db = await getTenantDb(id);
		return db!.model('Board', BoardSchema);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export default BoardModel;