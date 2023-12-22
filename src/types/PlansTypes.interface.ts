import Plans from "./Plan.enum";
import Price from "./Price";

export default interface PlansTypes {
	_id?: string;
	name: Plans;
	description: string;
	detail: string[];
	price: PlanPrice;
	max_users: number;
}

interface PlanPrice {
	monthly: Price;
	yearly: Price;
}