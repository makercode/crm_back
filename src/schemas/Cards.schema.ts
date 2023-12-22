import { getTenantDb } from "@database/tenant.connection";
import { Schema, Model, SchemaTypes } from "mongoose";
import Card from "types/Card.interface";

const CardSchema = new Schema<Card, Model<Card>>({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required :false
	},
	activities: [{
		type: SchemaTypes.ObjectId,
		ref: 'Activity',
	}],
	business: {
		type:  SchemaTypes.ObjectId,
		ref: 'ClientCompany',
	},
	client: {
		type: SchemaTypes.ObjectId,
		ref: 'Client',
		required: true
	},
	files: [{
		type: SchemaTypes.Map,
	}],
	notes: [{
		type: String
	}],
	state: {
		type: SchemaTypes.ObjectId,
		ref: 'Board',
		required: true
	},
	tags: [{
		type: SchemaTypes.ObjectId,
		ref: 'Tag'
	}],
	historial: [{
		type: String
	}]
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

const CardModel = async (id: string) => {
	try {
		const db = await getTenantDb(id);
		return db!.model('Card', CardSchema)
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export default CardModel;