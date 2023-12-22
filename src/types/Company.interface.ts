import { Schema } from "mongoose";

export default interface Company {
	_id: string;
	name: string;
	doc_number: string;
	phone_number: string;
	main_account: Schema.Types.ObjectId;
	users: Schema.Types.ObjectId[];
	subscription: Schema.Types.ObjectId;
	processes: Schema.Types.ObjectId[];
	
}