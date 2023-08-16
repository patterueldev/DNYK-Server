import { ICategory } from "../../domain/entities/ICategory";

export interface ICategoryRepository {
  getCategory(id: string): Promise<ICategory | null>;
  getCategories(): Promise<ICategory[]>;
  addCategory(name: String, groupId: String): Promise<ICategory>;
  updateCategory(category: ICategory): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}