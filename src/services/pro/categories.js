import Category from '../../core/models/category.js';

import { check, error } from '../../utils/utils.js';

import { categoriesCache } from '../../utils/caches.js';

export const getCategories = async (req, res) => {
  try {
    if (categoriesCache.get('categories')) {
      res.set('X-hit', 'hit');
      res.status(200).json(categoriesCache.get('categories'));
    } else {
      const categories = await Category.find();
      categoriesCache.set('categories', categories);
      res.status(200).json(categories);
    }
  } catch (e) {
    error(res, e);
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.name });
    check(!category, 'duplicated_organisation', 500);
    const request = new Category({
      name: req.body.name,
      createdAt: new Date(),
    });
    await request.save();
    categoriesCache.del('categories');
    res.status(201).json({ message: 'category_successfully_created' });
  } catch (e) {
    error(res, e);
  }
};
