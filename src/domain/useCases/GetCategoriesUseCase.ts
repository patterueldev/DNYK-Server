import { IGroupedCategories } from '../entities/IGroupedCategories';
import { ICategory, readyToAssignCategory } from "../entities/ICategory";
import { ICategoryRepository } from '../../data/repositories/ICategoryRepository';
import { inflowGroup } from '../entities/ICategoryGroup';

export default class GetCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<IGroupedCategories[]> {
    // fetch categories from the repository
    const repositoryCategories = await this.categoryRepository.getCategories();
    const allCategories = [readyToAssignCategory , ...repositoryCategories]
    const repositoryCategoryGroups = await this.categoryRepository.getGroups();
    const categoryGroups = [inflowGroup, ...repositoryCategoryGroups];
    
    const groupedCategories: { [key: string]: any[] } = {};
    for (const category of allCategories) {
      groupedCategories[category.groupId] = groupedCategories[category.groupId] || [];
      groupedCategories[category.groupId].push(category);
    }
    
    const groups = categoryGroups.map(group => {
      const categories = groupedCategories[group.identifier];
      
      if (!categories) {
          throw new Error(`Group ${group.identifier} not found`);
      }
      
      const categoryGroup: IGroupedCategories = {
        group,
        categories,
      };
      return categoryGroup;
    }).filter(Boolean);

    return groups;
  }
}
