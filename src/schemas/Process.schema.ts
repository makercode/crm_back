import { getTenantDb } from '@database/tenant.connection';
import { Schema, Model, SchemaTypes } from 'mongoose';
import IProcess from 'types/Process.interface';

const ProcessSchema = new Schema<IProcess, Model<IProcess>>({
	name: {
		type: String,
		required: true,
		unique: true
	},
	boards: [{
		type: SchemaTypes.ObjectId,
		ref: 'Board',
		default: []
	}]
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

const ProcessModel = async (id: string) => {
	try {
		const db = await getTenantDb(id);
		return db!.model('Process', ProcessSchema);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export default ProcessModel;