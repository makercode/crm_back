import CompanySchema, { GetCompanyModel } from "@schemas/Company.schema";
import initConnection, {connectTenant} from "./";

const  getMainModel = async () => {
	try {
		await initConnection();
		return CompanySchema;
	} catch (error) {
		console.error("An error ocrrued on getMainModel");
		console.error(error);
		throw error;
	}
}

const validDB = async (id: string) => {
	try {
		const Admin = await GetCompanyModel();
		const company = await Admin.findOne({name: id});
		return company;	
	} catch (error) {
		throw error;
	}
}

const getTenantDb = async (id: string) => {
	try {
		const isTenantExists = await validDB(id);
		if(!isTenantExists){
			throw Error('La base de datos no existe')
		}
		const name = isTenantExists.name.trim().replace(/ /g, '_');
		const tenantDb = await connectTenant(process.env.DB_CONNECTION_TENANT!);

		const connection = tenantDb?.useDb(`crm_${name}`, {useCache: true});
		return connection;
	} catch (error) {
		throw error;
	}
}

export {
	getMainModel,
	getTenantDb
}