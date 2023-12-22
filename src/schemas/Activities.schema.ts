import { getTenantDb } from '@database/tenant.connection';
import { Schema, Model, SchemaTypes } from 'mongoose';
import Activities from 'types/Activities.interface';

const ActivitiesSchema = new Schema<Activities, Model<Activities>>({
	completed: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		required: true
	},
	description: {
		type: String
	},
	is_high_priority: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		required: true
	},
	participants: [{
		type: SchemaTypes.ObjectId,
		ref: 'Client',
		
	}],
	related_by: {
		type: SchemaTypes.ObjectId,
		ref: 'Card',
		required: true
	},
	repeat: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		required: true
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

const ActivitiesModel = async (id: string) => {
	try {
		const db = await getTenantDb(id);
		return db!.model('Activity', ActivitiesSchema);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export default ActivitiesModel;