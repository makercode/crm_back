import { getTenantDb } from '@database/tenant.connection';
import { Schema, Model } from 'mongoose';
import Tag from 'types/Tags.intercae';

const TagSchema = new Schema<Tag, Model<Tag>>({
	name: {
		type: String,
		unique : true,
		required: true
	},
	color: {
		type: String,
		default: '#232B44'
	}
},{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

const TagModel = async (id: string) => {
	try {
		const db = await getTenantDb(id);
		return db!.model('Tag', TagSchema);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export default  TagModel;