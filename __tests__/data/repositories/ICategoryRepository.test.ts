import { ICategoryRepository } from "../../../src/data/repositories/ICategoryRepository";
import { ICategory } from "../../../src/domain/entities/ICategory";
import { describe, beforeEach, it, expect } from '@jest/globals';

// Mock implementation of the ICategoryRepository interface
class CategoryRepositoryMock implements ICategoryRepository {
  findById(id: string): Promise<ICategory | null> {
    // Implement the mock behavior for the findById method
    // Return the expected result based on the given id
    // You can also throw an error to simulate an exceptional case
    return Promise.resolve(
      {
        identifier: id,
        name: 'Some Category',
        groupId: 'some-group-id',
      }
    );
  }

  findAll(): Promise<ICategory[]> {
    // Implement the mock behavior for the findAll method
    // Return the expected result
    // You can also throw an error to simulate an exceptional case
    return Promise.resolve(
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
    );
  }

  create(name: string, group_id: string): Promise<ICategory> {
    // Implement the mock behavior for the create method
    // Return the expected result based on the given arguments
    // You can also throw an error to simulate an exceptional case
    return Promise.resolve(
      {
        identifier: 'some-id',
        name,
        groupId: group_id,
      }
    );
  }

  update(category: ICategory): Promise<void> {
    // Implement the mock behavior for the update method
    // Verify that the input category is correct and handle it accordingly
    // You can also throw an error to simulate an exceptional case
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    // Implement the mock behavior for the delete method
    // Verify that the input id is correct and handle it accordingly
    // You can also throw an error to simulate an exceptional case
    return Promise.resolve();
  }
}

describe('ICategoryRepository', () => {
  let categoryRepository: ICategoryRepository;

  beforeEach(() => {
    // Initialize the mock implementation of the repository before each test
    categoryRepository = new CategoryRepositoryMock();
  });

  it('should find a category by ID', async () => {
    const categoryId = 'some-id';

    // Call the findById method on the repository instance
    const category = await categoryRepository.findById(categoryId);

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
    const categories = await categoryRepository.findAll();

    // Assert that the returned categories match the expected result
    expect(categories.length).toEqual(2);
  });

  it('should create a new category', async () => {
    const categoryName = 'New Category';
    const groupId = 'some-group-id';

    // Call the create method on the repository instance
    const createdCategory = await categoryRepository.create(categoryName, groupId);

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
    await categoryRepository.update(updatedCategory);

    // Assert that the necessary actions were performed appropriately
    // You can verify if the update was successful or throw an error to simulate failure
  });

  it('should delete a category', async () => {
    const categoryId = 'some-id';

    // Call the delete method on the repository instance
    await categoryRepository.delete(categoryId);

    // Assert that the necessary actions were performed appropriately
    // You can verify if the deletion was successful or throw an error to simulate failure
  });
});
