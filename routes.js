import  express  from 'express';
import { index } from './src/controllers/homeController.js';
import { enter, register } from './src/controllers/loginController.js';

const route = express.Router();

route.get('/', index);

// rotas de login
route.get('/login/index', enter);
route.post('/login/register', register);

export default route;