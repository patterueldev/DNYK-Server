import { ICategory } from "./ICategory";
import { ICategoryGroup } from "./ICategoryGroup";

export interface IGroupedCategories {
  group: ICategoryGroup,
  categories: ICategory[]
}