import { Response } from "express";

export interface NetworkResponse {
	message: string;
	res: Response;
	status?: number;
}

export interface NetworkError extends NetworkResponse {
	error: any;
}

export interface NetworkSuccess extends NetworkResponse {
	data: any;
}