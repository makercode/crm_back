import { Schema } from 'mongoose';

export default interface IProcess {
	_id: string;
	name: string;
	boards: Schema.Types.ObjectId[];
}