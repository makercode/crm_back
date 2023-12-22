import { Schema, Model, model } from 'mongoose';
import Business from 'types/Business.interface';

const BusinessSchema = new Schema<Business, Model<Business>> ({
	name: {
		type: String,
		required: true,
	},
	phone: {
		
	}
})