import { ICategory } from "../../domain/entities/ICategory";
import { ICategoryRepository } from "../repositories/ICategoryRepository";
import mongoose, { Document, Schema } from 'mongoose';

interface ICategoryModel extends ICategory, Document {
  identifier: string;
  name: string;
  groupId: string;
}

const categorySchema = new Schema<ICategoryModel>({
  name: { type: String, required: true },
  groupId: { type: String, required: true },
}, {
  toJSON: { getters: true },
  id: false,
});
categorySchema.virtual('identifier').get(function (this: ICategoryModel) {
  return this._id.toString();
});

export const MDCategory = mongoose.model<ICategory>('categories', categorySchema);


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

  async findById(id: string): Promise<ICategory | null> {
    const category = await MDCategory.findById(id);
    return category;
  }

  async findAll(): Promise<ICategory[]> {
    await this.initializeClient();
    console.log("Finding all categories");
    const categories = await MDCategory.find();
    console.log("Categories: ", categories);
    return categories;
  }

  async create(name: string, groupId: string): Promise<ICategory> {
    await this.initializeClient();
    const category = new MDCategory({ name, groupId });
    await category.save();
    return category;
  }

  async update(category: ICategory): Promise<void> {
    throw new Error("Method not implemented.");
    // await this.collection.updateOne({ _id: category.id }, { $set: category });
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
    // await this.collection.deleteOne({ _id: id });
  }
}