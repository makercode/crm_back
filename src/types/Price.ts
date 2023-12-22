import { CurrencyName, CurrencySymbol } from "./Currency.enum";

export default interface Price {
	amount: number;
	currency: Currency;
}

export interface Currency {
	name: CurrencyName;
	symbol : CurrencySymbol;
}

