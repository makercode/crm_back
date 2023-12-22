import { Request, Response } from "express";
import PlanSchema, { GetPlanModel } from "@schemas/Plan.schema"; // Asegúrate de importar tu modelo correctamente

export default class PlansController {

	constructor(){}

	public async createPlan  (req: Request, res: Response)  {
		try {
		  const newPlan = await GetPlanModel();
		  const plan = new newPlan(req.body);
		  await plan.save();
		  res.status(201).json(plan);
		} catch (error) {
		console.log(error);
		res.status(500).json({ message: "No se pudieron obtener los planes.", error });
			}
	  };
	  
	  // Obtener todos los planes
	  public async getAllPlans  (_: Request, res: Response)  {
		try {
		  const plans = await PlanSchema.find();
		  res.status(200).json(plans ?? []);
		} catch (error) {
		  res.status(500).json({ message: "No se pudieron obtener los planes.", error });
		}
	  };
	  
	  // Obtener un plan por ID
	  public async getPlanById  (req: Request, res: Response)  {
		try {
		  const plan = await PlanSchema.findById(req.params.id);
		  if (!plan) {
			res.status(404).json({ error: "Plan no encontrado." });
		  } else {
			res.status(200).json(plan);
		  }
		} catch (error) {
		  res.status(500).json({ error: "No se pudo obtener el plan." });
		}
	  };
	  
	  // Actualizar un plan por ID
	  public async updatePlan  (req: Request, res: Response)  {
		try {
		  const updatedPlan = await PlanSchema.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		  );
		  if (!updatedPlan) {
			res.status(404).json({ error: "Plan no encontrado." });
		  } else {
			res.status(200).json(updatedPlan);
		  }
		} catch (error) {
		  res.status(500).json({ error: "No se pudo actualizar el plan." });
		}
	  };
	  
	  // Eliminar un plan por ID
	  public async deletePlan  (req: Request, res: Response)  {
		try {
		  const deletedPlan = await PlanSchema.findByIdAndRemove(req.params.id);
		  if (!deletedPlan) {
			res.status(404).json({ error: "Plan no encontrado." });
		  } else {
			res.status(204).send(); // No Content
		  }
		} catch (error) {
		  res.status(500).json({ error: "No se pudo eliminar el plan." });
		}
	  };
}
// Crear un plan

