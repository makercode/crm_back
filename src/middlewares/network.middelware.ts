import { NetworkError, NetworkSuccess } from "types/NetworkResponse.types";


const networkSuccess = ( { res,status = 200, message, data }: NetworkSuccess) => {
	res.status(status).send({
		message,
		success: true,
		data
	});
}

const networkError = ( { res,status = 400, message, error }: NetworkError) => {

	res.status(status).send({
		message,
		success: false,
		error
	});
}

const serverError = ( { res,status = 500, message, error }: NetworkError) => {
	res.status(status).send({
		message,
		success: false,
		error
	});
}

export {
	networkSuccess, networkError, serverError
}