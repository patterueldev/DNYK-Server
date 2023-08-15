import { ICategory } from "../entities/ICategory";
import { ICategoryRepository } from '../../data/repositories/ICategoryRepository';

export default class GetCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<ICategory[]> {
    // fetch categories from the repository
    const categories = await this.categoryRepository.findAll();
    // include a fixed category "Ready to Assign"
    const readyToAssignCategory = {
      identifier: "0",
      name: "Ready to Assign",
      groupId: "inflow",
    };
    return [readyToAssignCategory, ...categories];
  }
}
