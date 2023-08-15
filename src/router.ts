import express from 'express';

const router = express.Router();

// Import the use case(s) that you want to associate with each route
import { CreateCategoryUseCase } from './domain/useCases/CreateCategoryUseCase';
import { MDCategoryDataSource } from './data/dataSources/MDCategoryDataSource';
const categoryRepository = new MDCategoryDataSource();
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

router.post('/categories', (req, res) => {
  const { name, groupId } = req.body;
  const category = createCategoryUseCase.execute(name, groupId);
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

export default router;