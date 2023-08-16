import { ICategoryRepository } from "../../../src/data/repositories/ICategoryRepository";
import { ICategory } from "../../../src/domain/entities/ICategory";
import { jest, describe, beforeEach, it, expect } from '@jest/globals';

const categoryRepositoryMock: ICategoryRepository = {
  getCategory: jest.fn((id: string) => Promise.resolve({
    identifier: id,
    name: 'Some Category',
    groupId: 'some-group-id',
  })),
  getCategories: jest.fn(() => Promise.resolve(
    [
      {
        identifier: 'some-id',
        name: 'Some Category',
        groupId: 'some-group-id',
      },
      {
        identifier: 'some-other-id',
        name: 'Some Other Category',
        groupId: 'some-group-id',
      },
    ]
  )),
  addCategory: jest.fn((name: string, group_id: string) => Promise.resolve({
    identifier: 'some-id',
    name,
    groupId: group_id,
  })),
  updateCategory: jest.fn((category: ICategory) => Promise.resolve()),
  deleteCategory: jest.fn((id: string) => Promise.resolve()),
}

describe('ICategoryRepository', () => {
  let categoryRepository: ICategoryRepository;

  beforeEach(() => {
    // Initialize the mock implementation of the repository before each test
    categoryRepository = categoryRepositoryMock;
  });

  it('should find a category by ID', async () => {
    const categoryId = 'some-id';

    // Call the findById method on the repository instance
    const category = await categoryRepository.getCategory(categoryId);

    // Assert that the returned category matches the expected result
    expect(category).toEqual(
      {
        identifier: categoryId,
        name: 'Some Category',
        groupId: 'some-group-id'
      }
    );
  });

  it('should retrieve all categories', async () => {
    // Call the findAll method on the repository instance
    const categories = await categoryRepository.getCategories();

    // Assert that the returned categories match the expected result
    expect(categories.length).toEqual(2);
  });

  it('should create a new category', async () => {
    const categoryName = 'New Category';
    const groupId = 'some-group-id';

    // Call the create method on the repository instance
    const createdCategory = await categoryRepository.addCategory(categoryName, groupId);

    // Assert that the created category matches the expected result
    expect(createdCategory.name).toEqual(categoryName);
  });

  it('should update a category', async () => {
    const updatedCategory: ICategory = {
      identifier: 'category-id',
      name: 'Some category',
      groupId: 'some-group-id'
    };

    // Call the update method on the repository instance
    await categoryRepository.updateCategory(updatedCategory);

    // Assert that the necessary actions were performed appropriately
    // You can verify if the update was successful or throw an error to simulate failure
  });

  it('should delete a category', async () => {
    const categoryId = 'some-id';

    // Call the delete method on the repository instance
    await categoryRepository.deleteCategory(categoryId);

    // Assert that the necessary actions were performed appropriately
    // You can verify if the deletion was successful or throw an error to simulate failure
  });
});
