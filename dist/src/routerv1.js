"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routerv1 = express_1.default.Router();
// Import the use case(s) that you want to associate with each route
const CreateCategoryUseCase_1 = __importDefault(require("./domain/useCases/CreateCategoryUseCase"));
const MDCategoryDataSource_1 = require("./data/dataSources/MDCategoryDataSource");
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/dnyk";
const dbName = process.env.MONGODB_DB || "dnyk";
const categoryRepository = new MDCategoryDataSource_1.MDCategoryDataSource(uri, dbName);
const createCategoryUseCase = new CreateCategoryUseCase_1.default(categoryRepository);
routerv1.get('/test', (req, res) => {
    res.json({ message: 'Hello World!!!' });
});
routerv1.get('/test2', (req, res) => {
    res.json({ message: 'Hello World 2!' });
});
routerv1.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield categoryRepository.findAll();
    res.json(categories);
}));
routerv1.post('/categories/create', express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, groupId } = req.body;
    const category = yield createCategoryUseCase.execute(name, groupId);
    res.json(category);
}));
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
exports.default = routerv1;
