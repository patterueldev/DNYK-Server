import { ICategory } from "../../domain/entities/ICategory";
import { ICategoryRepository } from "../repositories/ICategoryRepository";
import { MongoClient, Collection } from "mongodb";
import mongoose, { Document, Schema } from 'mongoose';


const categorySchema = new Schema<ICategory>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  groupId: { type: String, required: true },
});

export const MDCategory = mongoose.model<ICategory>('MDCategory', categorySchema);


export class MDCategoryDataSource implements ICategoryRepository {
  private collection: Collection;

  constructor() {
    // Initialize MongoDB connection and collection
    this.collection = new Collection();
    const uri = "mongodb+srv://patteruel-dev:<password>@cluster0.thspzcw.mongodb.net/?retryWrites=true&w=majority"; // Update with your MongoDB connection URI
    const dbName = "dnyk"; // Update with your database name
    const client = new MongoClient(uri);
    client.connect()
      .then(() => {
        this.collection = client.db(dbName).collection("categories");
      })
      .catch(err => {
        console.error("Failed to connect to MongoDB:", err);
      });
  }

  async findById(id: string): Promise<ICategory | null> {
    throw new Error("Method not implemented.");
    // const category = await this.collection.findOne({ _id: id });
    // return category ? category as ICategory : null;
  }

  async findAll(): Promise<ICategory[]> {
    throw new Error("Method not implemented.");
    // const categories = await this.collection.find().toArray();
    // return categories as ICategory[];
  }

  async create(name: string, groupId: string): Promise<ICategory> {
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