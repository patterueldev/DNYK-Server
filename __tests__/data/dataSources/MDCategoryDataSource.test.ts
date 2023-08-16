import { MDCategory, MDCategoryDataSource } from "../../../src/data/dataSources/MDCategoryDataSource";
import { describe, it, expect} from "@jest/globals";
import { ICategoryRepository } from "../../../src/data/repositories/ICategoryRepository";
import { afterEach, beforeEach } from "@jest/globals";
import mongoose from "mongoose";

describe('MDCategoryDataSource', () => {
  let categoryRepository: ICategoryRepository;
  
  // Before each test, we initialize the database connection
  beforeEach(async () => {
    let uri = process.env.MONGODB_URI;
    if(!uri) throw new Error('No mongo uri found');
    await mongoose.connect(uri);
    categoryRepository = new MDCategoryDataSource(uri);
  });

  // After each test, we delete all the data
  afterEach(async () => {
    await MDCategory.deleteMany();
    await mongoose.connection.close();
  });

  it('should create two category', async () => {
    // given
    let name = 'category1';
    let groupId = 'group1';

    // when
    let category = await categoryRepository.create('category1', 'group1' );

    // then
    expect(category).toHaveProperty('identifier');
  });

  it('should get all categories', async () => {
    // given - populate the database
    let groupId = 'group1';
    for(let i = 0; i < 2; i++) {
      let name = `category${i}`;
      let category = await new MDCategory({name, groupId})
      await category.save();
    }

    // when - get all categories
    let categories = await categoryRepository.findAll();

    // then - expect to have 2 categories
    expect(categories).toHaveLength(2);
    // expect all categories to be in the same group
    for(let category of categories) {
      expect(category.groupId).toBe(groupId);
    }
  });

  it('should get category by id', async () => {
    // given
    let name = 'category1';
    let groupId = 'group1';
    let newCategory = await new MDCategory({name, groupId})
    await newCategory.save();
    let id = newCategory._id.toString();

    // when
    let categoryFound = await categoryRepository.findById(id);
    
    // then
    if (!categoryFound) throw new Error('Category not found');
    expect(categoryFound.identifier).toBe(id);
    expect(categoryFound.name).toBe(name);
    expect(categoryFound.groupId).toBe(groupId);
  });




  // afterEach(async () => {
  //   // await categoryRepository.deleteAll();
  // });
})