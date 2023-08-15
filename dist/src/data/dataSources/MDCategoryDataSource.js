"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MDCategoryDataSource = exports.MDCategory = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    groupId: { type: String, required: true },
});
exports.MDCategory = mongoose_1.default.model('MDCategory', categorySchema);
class MDCategoryDataSource {
    constructor(uri, dbName) {
        this.uri = uri;
        this.dbName = dbName;
    }
    initializeClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client) {
                this.client = yield mongoose_1.default.connect(this.uri);
            }
            return this.client;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
            // const category = await this.collection.findOne({ _id: id });
            // return category ? category as ICategory : null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initializeClient();
            return yield exports.MDCategory.find();
        });
    }
    create(name, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initializeClient();
            const category = new exports.MDCategory({ name, groupId });
            yield category.save();
            return category;
        });
    }
    update(category) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
            // await this.collection.updateOne({ _id: category.id }, { $set: category });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
            // await this.collection.deleteOne({ _id: id });
        });
    }
}
exports.MDCategoryDataSource = MDCategoryDataSource;
