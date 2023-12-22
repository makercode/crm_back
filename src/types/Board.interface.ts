import { Schema } from "mongoose";

export default interface Board {
	_id: string;
	name: string;
	color: string;
	process: Schema.Types.ObjectId;
	cards: Schema.Types.ObjectId[];
}