import initConnection from "@database/index";
import { Schema, Model, model, SchemaTypes } from "mongoose";
import PlansTypes from "types/PlansTypes.interface";

const PlanSchema = new Schema<PlansTypes, Model<PlansTypes>>({
	detail:[{
		type: String,
		required: true
	}],
	max_users: {
		type: Number,
		required: true,
		min: 3
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: SchemaTypes.Map,
		required: true
	}
});

const GetPlanModel = async () => {
	try {
		const db = await initConnection();
		return db.model('Plan', PlanSchema);
	} catch (error) {
		throw error;
	}
}

export default model('Plan', PlanSchema);
export { GetPlanModel }