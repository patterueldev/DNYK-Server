import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config()


const routerv1 = express.Router();

// Import the use case(s) that you want to associate with each route
import GetCategoriesUseCase from './domain/useCases/GetCategoriesUseCase';
import CreateCategoryUseCase from './domain/useCases/CreateCategoryUseCase';
import { MDCategoryDataSource } from './data/dataSources/MDCategoryDataSource';

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/dnyk";
const categoryRepository = new MDCategoryDataSource(uri);

const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

routerv1.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});
routerv1.get('/test2', (req, res) => {
  res.json({ message: 'Hello World 2!' });
});
routerv1.get('/categories', async (req: Request, res: Response) => {
  const categories = await getCategoriesUseCase.execute();
  res.json(categories);
});
routerv1.post('/categories', express.json(), async (req: Request, res: Response) => {
  const { name, groupId } = req.body;
  const category = await createCategoryUseCase.execute(name, groupId);
  res.json(category);
});

// // Define your routes
// router.get('/users/:id', (req, res) => {
//   // Call the appropriate use case function
//   const user = getUser(req.params.id);
//   res.json(user);
// });

// router.post('/users', (req, res) => {
//   // Call the appropriate use case function
//   const newUser = createUser(req.body);
//   res.json(newUser);
// });

export default routerv1;