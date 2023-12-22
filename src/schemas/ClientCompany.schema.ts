import { getTenantDb } from '@database/tenant.connection';
import { Schema, Model } from 'mongoose';
import Business from 'types/Business.interface';

const ClientCompanySchema = new Schema<Business, Model<Business>>({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	doc_number: {
		type: String,
		unique: true
	},
	doc_type: {
		type: String,
		default: 'RUC'
	},
	website: {
		type: String
	}

}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

const ClientBusinessModel = async (id: string) => {
	try {
		const db = await getTenantDb(id);
		return db!.model('ClientCompany', ClientCompanySchema)
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export default ClientBusinessModel;