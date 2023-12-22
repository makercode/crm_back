import { getTenantDb } from '@database/tenant.connection'
import { Schema, Model } from 'mongoose'

import Products from 'types/Products.interface'

const ProductSchema = new Schema<Products, Model<Products>>({
	amount: {
		type: Number,
		required: true,
		min: 1
	},
	brand: {
		type: String,
	},
	name: {
		type: String,
		required: true
	},
	code: {
		type: String,
		unique: true
	},
	category: {
		type: String
	},
	description: {
		type: String
	},
	enable: {
		type: Boolean
	},
	stock: {
		type: Number,
		required: true
	},
	tax: {
		type: Number,
		required: true
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

const ProductModel = async (id: string) => {
	try {
		const db = await getTenantDb(id);
		return db!.model('Product', ProductSchema)
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export default ProductModel;