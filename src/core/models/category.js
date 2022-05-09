import mongoose from 'mongoose';

const Category = mongoose.model(
  'Category',
  {
    name: { type: String, required: true },
    createdAt: { type: Date, required: true },
  },
);

export default Category;
