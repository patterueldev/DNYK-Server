import { ICategory } from "../../domain/entities/ICategory";
import { ICategoryRepository } from "../repositories/ICategoryRepository";
import mongoose from "mongoose";
import { MDCategory } from "../../domain/entities/MongoDBEntities/MDCategory";
import { ICategoryGroup } from "../../domain/entities/ICategoryGroup";
import { MDCategoryGroup } from "../../domain/entities/MongoDBEntities/MDCategoryGroup";

export class MDCategoryDataSource implements ICategoryRepository {
  private uri: string;
  private client: typeof mongoose | undefined;

  constructor(uri: string) {
    this.uri = uri;
  }

  private async initializeClient(): Promise<typeof mongoose> {
    if (!this.client) {
      this.client = await mongoose.connect(this.uri);
    }
    return this.client;
  }

  async getCategory(id: string): Promise<ICategory | null> {
    const category = await MDCategory.findById(id);
    return category;
  }

  async getCategories(): Promise<ICategory[]> {
    await this.initializeClient();
    const categories = await MDCategory.find();
    return categories;
  }

  async addCategory(name: string, groupId: string): Promise<ICategory> {
    await this.initializeClient();
    const category = new MDCategory({ name, groupId });
    await category.save();
    return category;
  }

  async updateCategory(category: ICategory): Promise<void> {
    throw new Error("Method not implemented.");
    // await this.collection.updateOne({ _id: category.id }, { $set: category });
  }

  async deleteCategory(id: string): Promise<void> {
    throw new Error("Method not implemented.");
    // await this.collection.deleteOne({ _id: id });
  }

  getGroup(id: string): Promise<ICategoryGroup | null> {
    throw new Error("Method not implemented.");
  }
  async getGroups(): Promise<ICategoryGroup[]> {
    await this.initializeClient();
    const groups = await MDCategoryGroup.find();
    return groups;
  }
  addGroup(name: String): Promise<ICategoryGroup> {
    throw new Error("Method not implemented.");
  }
  updateGroup(group: ICategoryGroup): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteGroup(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}