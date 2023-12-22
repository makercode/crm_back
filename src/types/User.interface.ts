import { Schema } from "mongoose";

export default interface User {
	_id: string;
	name: string;
	email: string;
	phone: string;
	country: string;
	password: string;
	permissions: any[];
	plan: Schema.Types.ObjectId;
	is_active: boolean;
	due_date: Date;
	company?: Schema.Types.ObjectId;
}