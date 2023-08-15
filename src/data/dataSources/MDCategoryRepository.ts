import { ICategory } from "../../domain/entities/ICategory";
import { ICategoryRepository } from "../repositories/ICategoryRepository";
import { MongoClient, Collection } from "mongodb";

export class MDCategoryDataSource implements ICategoryRepository {
  private collection: Collection;

  constructor() {
    // Initialize MongoDB connection and collection
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
    const category = await this.collection.findOne({ _id: id });
    return category ? category as ICategory : null;
  }

  async findAll(): Promise<ICategory[]> {
    const categories = await this.collection.find().toArray();
    return categories as ICategory[];
  }

  async create(name: string, groupId: string): Promise<ICategory> {
    const category: ICategory = { name, groupId };
    const result = await this.collection.insertOne(category);
    return result.ops[0] as ICategory;
  }

  async update(category: ICategory): Promise<void> {
    await this.collection.updateOne({ _id: category.id }, { $set: category });
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ _id: id });
  }
}

