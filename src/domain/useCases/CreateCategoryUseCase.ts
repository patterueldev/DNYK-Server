// src/domain/usecases/CreateCategoryUseCase.ts

import { ICategory } from "../entities/ICategory";
import { ICategoryRepository } from '../../data/repositories/ICategoryRepository';

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(name: string, groupId: string): Promise<ICategory> {
    const createdCategory = await this.categoryRepository.create(name, groupId);
    return createdCategory;
  }
}
