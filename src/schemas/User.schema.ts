import initConnection from '@database/index';
import dayjs from 'dayjs';
import { Schema, model, Model, SchemaTypes } from 'mongoose';
import User from 'types/User.interface';

const UserSchema = new Schema<User, Model<User>>({
	email: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	permissions: [{
		type: SchemaTypes.Mixed,
		required: false
	}],
	phone: {
		type: String,
		required: true,
		unique: true
	},
	country: {
		type: String,
		required: true,
		default: 'Peru'
	},
	company: {
		type: String,
		required: false
	},
	due_date: {
		type: Date,
		required: true,
		default: dayjs().add(14, 'days')
	},
	is_active: {
		type: Boolean,
		required: true,
		default: true
	},
	plan: {
		type: SchemaTypes.ObjectId,
		ref: 'Plan',
		required: true
	}
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt'
	}
});

const GetUserModel = async () => {
	try {
		const db = await initConnection();
		return db.model('User', UserSchema);
	} catch (error) {
		throw error;
	}
}

export default model('User', UserSchema);

export { GetUserModel }