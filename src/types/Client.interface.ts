import { Schema } from "mongoose";

export default interface CRMClient {
	_id: string;
	name: string;
	last_name: string;
	title: string;
	email: string;
	business: Schema.Types.ObjectId;
	phone: string;
	description: string;
}