import { Schema } from "mongoose";

export default interface Card {
	_id: string;
	description: string;
	client: Schema.Types.ObjectId;
	business: Schema.Types.ObjectId;
	tags: Schema.Types.ObjectId[];
	notes: string[];
	files: string[];
	activities: string[];
	state: Schema.Types.ObjectId;
	name: string;
	historial: string;
}