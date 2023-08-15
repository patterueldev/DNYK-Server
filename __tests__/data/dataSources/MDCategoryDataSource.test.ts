import { MDCategoryDataSource } from "../../../src/data/dataSources/MDCategoryDataSource";
import { describe, it, expect} from "@jest/globals";
import { ICategoryRepository } from "../../../src/data/repositories/ICategoryRepository";
import { afterEach, before, beforeEach } from "node:test";

describe('MDCategoryDataSource', () => {
  let categoryRepository: ICategoryRepository;
  var categoryIDs: string[];
  
  function initialize() {
    let temp = 'mongodb://localhost:27017/test';
    let uri = process.env.MONGO_URI_TEST || temp;
    console.log('uri: ', uri);
    categoryRepository = new MDCategoryDataSource(uri);
    categoryIDs = [];
  }

  async function createCategories() {
    let category1 = await categoryRepository.create('category1', 'group1' );
    let category2 = await categoryRepository.create('category2', 'group1' );
    categoryIDs.push(category1.identifier);
    categoryIDs.push(category2.identifier);
  }

  // test create first, so we could get the id for the other tests
  it('should create two category', async () => {
    initialize();
    await createCategories();
    expect(categoryIDs).toBeGreaterThanOrEqual(2);
  });

  it('should get all categories', async () => {
    initialize()
    let categories = await categoryRepository.findAll();
    expect(categoryIDs).toBeGreaterThanOrEqual(2);
    // check if the added category is in the list
    expect(categories).toContain(
      expect.arrayContaining([
        expect.objectContaining({ name: 'category1' }),
        expect.objectContaining({ name: 'category2' })
      ])
    );
  });

  it('should get category by id', async () => {
    initialize()
    await createCategories();
    if(categoryIDs.length == 0) {
      throw new Error('No category id found');
    }
    for (let id of categoryIDs) {
      let category = await categoryRepository.findById(id);
      expect(category).toHaveProperty('identifier');
    }
  });




  // afterEach(async () => {
  //   // await categoryRepository.deleteAll();
  // });
})