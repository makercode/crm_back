import initConnection from "@database/index";
import { Schema, Model, model, SchemaTypes } from "mongoose";
import Company from "types/Company.interface";

const CompanySchema = new Schema<Company, Model<Company>>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	doc_number: {
		type: String,
		required: false,
	},
	
	phone_number: {
		type: String,
		required: false,
		unique: true,
	},
	main_account: {
		type: SchemaTypes.ObjectId,
		ref: 'User',
		required: true
	},
	users: [{
		type: SchemaTypes.ObjectId,
		ref: 'User',
		default: []
	}],
	subscription: {
		type: SchemaTypes.ObjectId,
		ref: 'Plan'
	},
	processes: [{
		type: SchemaTypes.ObjectId,
		ref:'Process',
		default: []
	}]
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

const GetCompanyModel = async () => {
	try {
		const db = await initConnection();
		return db.model('Company', CompanySchema);
	} catch (error) {
		throw error;
	}
}

export { GetCompanyModel }
export default model('Company', CompanySchema);