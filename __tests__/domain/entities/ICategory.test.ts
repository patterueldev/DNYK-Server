import { ICategory } from "../../../src/domain/entities/ICategory";
import { test, expect } from "@jest/globals";

test('ICategory should have correct properties', () => {
  // Create a sample category object
  const category: ICategory = {
    identifier: '123',
    name: 'Example Category',
    groupId: '456',
  };

  // Use assertions to check if the category has the expected properties
  expect(category.identifier).toBe('123');
  expect(category.name).toBe('Example Category');
  expect(category.groupId).toBe('456');
});
