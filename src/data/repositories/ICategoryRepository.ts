import { ICategory } from "../../domain/entities/ICategory";
import { ICategoryGroup } from "../../domain/entities/ICategoryGroup";
export interface ICategoryRepository {
  getCategory(id: string): Promise<ICategory | null>;
  getCategories(): Promise<ICategory[]>;
  addCategory(name: String, groupId: String): Promise<ICategory>;
  updateCategory(category: ICategory): Promise<void>;
  deleteCategory(id: string): Promise<void>;

  getGroup(id: string): Promise<ICategoryGroup | null>;
  getGroups(): Promise<ICategoryGroup[]>;
  addGroup(name: String): Promise<ICategoryGroup>;
  updateGroup(group: ICategoryGroup): Promise<void>;
  deleteGroup(id: string): Promise<void>;
}