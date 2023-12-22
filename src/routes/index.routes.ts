import { Express } from 'express';
import plansRoute from './plan.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import boardRoutes from './boards.routes';
import processRoutes from './process.routes';
import cardRoutes from './cards.routes';
import activityRoutes from './activity.routes';
import clientbusinessRoute from './client_bussiness.routes';
import clientRouttes from './client.routes';
import tagRoutes from './tag.routes';

const registryRoutes = (server: Express) => {
	server.use('/api/plans', plansRoute);
	server.use('/api/users', userRoutes);
	server.use('/api/auth', authRoutes);
	server.use('/api/process', processRoutes);
	server.use('/api/boards', boardRoutes);
	server.use('/api/cards', cardRoutes);
	server.use('/api/activities', activityRoutes);
	server.use('/api/client_business', clientbusinessRoute);
	server.use('/api/client', clientRouttes);
	server.use('/api/tags', tagRoutes);
	return;
}

export default registryRoutes;