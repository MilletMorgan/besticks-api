import express from 'express';
import {
  getOneOrganisation,
  getAllOrganisation,
  createOrganisation,
  deleteOrganisation,
  updateOrganisation,
  getOrganisationEvents,
} from './organisations.js';
import {
  getOneEvent,
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent, listEventsWithFilters,
} from './events.js';
import {
  getCategories,
  createCategory,
} from './categories.js';

import proMiddleware from '../../core/middlewares/proMiddleware.js';
import authMiddleware from '../../core/middlewares/authMiddleware.js';

const router = express.Router();

/**
 * ORGANISATIONS
 */
router.get('/organisations', proMiddleware, getAllOrganisation);
router.get('/organisations/:id', proMiddleware, getOneOrganisation);
router.get('/organisations/:id/events', proMiddleware, getOrganisationEvents);
router.post('/organisations', authMiddleware, createOrganisation);
router.delete('/organisations/:id', proMiddleware, deleteOrganisation);
router.put('/organisations/:id', proMiddleware, updateOrganisation);

/**
 * EVENTS
 */
router.get('/events', getEvents);
router.get('/events/search', listEventsWithFilters);
router.get('/events/:id', proMiddleware, getOneEvent);
router.post('/events', proMiddleware, createEvent);
router.delete('/events/:id', proMiddleware, deleteEvent);
router.put('/events/:id', proMiddleware, updateEvent);

/**
 * CATEGORIES
 */
router.get('/categories', getCategories);
router.post('/categories', proMiddleware, createCategory);

export default router;
