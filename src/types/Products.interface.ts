export default interface Products {
	_id: string;
	name: string;
	code?: string;
	category: string;
	amount: number;
	description: string;
	enable?: boolean;
	stock: number;
	tax: number;
	brand: string;
}