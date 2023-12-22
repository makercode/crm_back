import mongoose from 'mongoose';

let db: mongoose.Connection;

type Tenant = {
	id: string;
	connection: mongoose.Connection
};

export class TenantConnection {
	public connectionList: Tenant[];
	
	constructor(){
		this.connectionList = [];
	}

	private async connectTenant (url: string) : Promise<mongoose.Connection | false> {
		try {
			const connection = await mongoose.createConnection(url);
			return connection;
		} catch (error) {
			console.error("### CONNECT TENANT ERROR ###", error);
			return false;
		}
	}

	private findConnection(id: string): Tenant | false {
		if(this.connectionList.length === 0) return false;
		const tenantConnection = this.connectionList.find((tenant: Tenant) => tenant.id === id);
		if(!tenantConnection) return false;
		return tenantConnection;
	}

	public async hasConnectionInstance(id: string): Promise<mongoose.Connection | false> {
		try {
			const isAlreadyConnected = this.findConnection(id);
			if(isAlreadyConnected) return isAlreadyConnected.connection;

			const connection = await this.connectTenant(id);
			if(connection){
				this.connectionList.push({id, connection});
				return connection;
			}
			return false;

		} catch (error) {
			console.log('Error Has been ocurred on setConnectionInstance [function]');
			console.log(error);
			return false;
		}
	}

}
const initConnection = async () => {
	try {
		if(db){
			return db;
		}
		const connection = await mongoose.createConnection(process.env.DB_CONNECTION_MAIN!);
		db = connection;
		console.log("Database Successfully   connected!");
		return connection;
	} catch (error) {
		console.error(error);
		throw new Error('Error en la conexión a la bases de datos');
	}
}

export  const connectTenant = async (url: string) => {
	try {
		const connection = await mongoose.createConnection(url);
		connection.set('useUnifiedTopology', true);
		connection.set("tenantSchema", {
			_id: { type: String, required: true },
		});
		return connection;
	} catch (error) {
		console.error(error);
	}
};

export default initConnection;