import Event from '../../core/models/event.js';

import { check, error } from '../../utils/utils.js';

export const getOneEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (e) {
    error(res, e);
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event
      .find()
      .limit(parseInt(req.query.limit, 10) || 3)
      .skip(parseInt(req.query.offset, 10) || 0)
      .sort({ dateStart: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const listEventsWithFilters = async (req, res) => {
  try {
    const events = await Event.find({
      city: req.query.city || { $ne: null },
      category: req.query.category || { $ne: null },
      price: {
        $gte: req.query.minPrice || 0,
        $lte: req.query.maxPrice || 9999999999,
      },
      date: {
        $gte: req.query.minDate || new Date(),
        $lte: req.query.maxDate || '2030-12-31',
      },
      ...req.query.tags
        ? {
          tags: {
            $in: req.query.tags.split('-'),
          },
        }
        : {},
    });

    res.status(200).json(events);
  } catch (e) {
    res.status(500).json({
      message: 'An error occurred during the execution of the request',
      error: e,
    });

    error(res, e);
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ name: req.body.name });
    // const organisation = await Organisation.findOne({ _id: res.locals.user.organisation });
    // check(organisation, 'unknown_organisation', 404);
    check(!event, 'duplicated_event', 500);

    const request = new Event({
      createdAt: new Date(),
      organisation: req.body.organisation,
      name: req.body.name,
      tickets: req.body.tickets,
      category: req.body.category,
      price: req.body.price,
      highlighted: req.body.highlighted,
      highlightedCover: req.body.highlightedCover,
      location: req.body.location,
      city: req.body.city,
      date: req.body.date,
      tags: req.body.tags,
      description: req.body.description,
      cover: req.body.cover,
    });
    await request.save();
    res.status(201).json({ message: 'event_successfully_created' });
  } catch (e) {
    error(res, e);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    check(event, 'event_not_found', 404);

    if (res.locals.user.organisation.toString() !== event.organisation.toString()) {
      throw { code: 401, message: 'unauthorized' };
    }
    await event.remove();
    res.status(200).json('event_successfully_deleted');
  } catch (e) {
    error(res, e);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    check(event, 'event_not_found', 404);
    if (res.locals.user.organisation.toString() !== event.organisation.toString()) {
      throw { code: 401, message: 'unauthorized' };
    }
    event.createdAt = new Date();
    event.name = req.body.name || event.name;
    event.tickets = req.body.tickets || event.tickets;
    event.category = req.body.category || event.category;
    event.price = req.body.price || event.price;
    event.highlighted = req.body.highlighted || event.highlighted;
    event.highlightedCover = req.body.highlightedCover || event.highlightedCover;
    event.location = req.body.location || event.location;
    event.date = req.body.date || event.date;
    event.tags = req.body.tags || event.tags;
    event.description = req.body.description || event.description;
    event.cover = req.body.cover || event.cover;
    await event.save();
    res.status(200).json({ message: 'event_successfully_updated' });
  } catch (e) {
    error(res, e);
  }
};

export const decrementTicket = async (req) => {
  const event = await Event.updateOne({ _id: req.body.id }, { $inc: { tickets: -1 } });

  await event.save();
};
