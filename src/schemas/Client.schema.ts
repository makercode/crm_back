import { getTenantDb } from '@database/tenant.connection';
import { Schema, Model, SchemaTypes } from 'mongoose';
import CRMClient from 'types/Client.interface';

const ClientSchema = new Schema<CRMClient, Model<CRMClient>>({
	name: {
		type: String,
		required: true
	},
	business: {
		type: SchemaTypes.ObjectId,
		ref: 'ClientCompany'
	},
	description: {
		type: String
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	last_name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true,
		unique: true
	},
	title: {
		type: String
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

const ClientModel = async (id: string) => {
	try {
		const db = await getTenantDb(id);
		return db!.model('Client', ClientSchema)
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export default ClientModel