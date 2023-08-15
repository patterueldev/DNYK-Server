import { ICategory } from "../../domain/entities/ICategory";

export interface ICategoryRepository {
  findById(id: string): Promise<ICategory | null>;
  findAll(): Promise<ICategory[]>;
  create(name: String, group_id: String): Promise<ICategory>;
  update(category: ICategory): Promise<void>;
  delete(id: string): Promise<void>;
}
