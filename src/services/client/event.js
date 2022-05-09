import Event from '../../core/models/event.js';
import { error } from '../../utils/utils.js';
import User from '../../core/models/user.js';

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event
      .find(req.query.category ? { category: req.query.category } : {})
      .limit(parseInt(req.query.limit, 10) || 3)
      .skip(parseInt(req.query.offset, 10) || 0)
      .sort({ dateStart: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getHighlightedEvents = async (req, res) => {
  try {
    const events = await Event.find({ highlighted: true }).limit(3);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getOneEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const decrementTickets = async (eventId) => {
  const event = await Event.findById(eventId);

  event.tickets -= 1;

  await event.save();
};

const addEventPurchasedToUser = async (userId, eventId) => {
  const user = await User.findById(userId);

  user.eventsPurchased.push(eventId);

  await user.save();
};

export const buyATicket = async (req, res) => {
  try {
    await decrementTickets(req.body.eventId);
    await addEventPurchasedToUser(req.body.userId, req.body.eventId);

    res.status(204).json({ message: 'The ticket for this event has been successfully purchased.' });
  } catch (e) {
    error(res, e);
  }
};
