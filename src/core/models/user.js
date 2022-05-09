import mongoose from 'mongoose';

const User = mongoose.model(
  'User',
  {
    createdAt: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    birthDate: { type: Date, required: false },
    phone: String,
    organisation: { type: mongoose.Schema.Types.ObjectId, required: false },
    refreshToken: String,
    admin: { type: Boolean, required: false },
    eventsPurchased: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  },
);

export default User;
