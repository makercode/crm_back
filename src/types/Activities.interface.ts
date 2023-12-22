import { Schema } from "mongoose";

export default interface Activities {
	_id: Schema.Types.ObjectId;
	name: string;
	type: string;
	repeat: boolean;
	date: Date;
	description?: string;
	is_high_priority: boolean;
	completed: boolean;
	participants?: Schema.Types.ObjectId[];
	related_by: Schema.Types.ObjectId;
}