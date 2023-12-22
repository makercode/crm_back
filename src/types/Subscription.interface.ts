import { Schema } from "mongoose";
import Price from "./Price.interface";

export default interface Subscription {
	_id: string;
	name: string;
	description: string;
	benefits: string[];
	active_users: number;
	main_user: Schema.Types.ObjectId;
	price: PlanPrice;
	plan: Schema.Types.ObjectId;
}

interface PlanPrice {
	monthly: Price;
	yearly: Price;
}