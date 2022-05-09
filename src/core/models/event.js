import mongoose from 'mongoose';

const Event = mongoose.model(
  'Event',
  {
    createdAt: { type: Date, required: true },
    tickets: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    highlighted: { type: Boolean, required: false },
    highlightedCover: { type: String, required: false },
    city: { type: String, required: true },
    location: { type: String, required: true },
    name: { type: String, required: true },
    organisation: { type: mongoose.Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    tags: { type: [String], required: false },
    cover: { type: String, required: true },
  },
);

export default Event;
