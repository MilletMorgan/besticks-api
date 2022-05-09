import mongoose from 'mongoose';

const Organisation = mongoose.model(
  'Organisation',
  {
    createdAt: { type: Date, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: Map, of: String, required: true },
    phone: { type: String, required: true },
  },
);

export default Organisation;
