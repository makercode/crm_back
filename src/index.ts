import moduleAlias from 'module-alias';

moduleAlias.addAliases({

	'@controllers': `${__dirname}/controllers`,
	'@constants': `${__dirname}/shared/constants`,
	'@utils': `${__dirname}/shared/utils`,
	"@database": `${__dirname}/database`,
	types: `${__dirname}/types`,
	"@enums": `${__dirname}/types/enums`,
	"@middlewares": `${__dirname}/middlewares`,
	"@cli": `${__dirname}/../cli`,
	"@schemas": `${__dirname}/schemas`,
	"@routes": `${__dirname}/routes`
});

import cors from 'cors';
import express, { Response } from 'express';
import { enableEnviroments } from '@cli/enableEnviroment';
import registryRoutes from '@routes/index.routes';

enableEnviroments();

const app = express();
app.use(cors());
app.use(express.json());

registryRoutes(app);

const message = "The server is running!!";

app.get('/', (_, res: Response) => {
	res.send(message);
});

app.listen(process.env.PORT! ?? 8080, () => {
	console.log(`Running as ${process.env.NODE_ENV!} mode`);
	console.log(`${message} on port ${process.env.PORT ?? 8008}`);
})
