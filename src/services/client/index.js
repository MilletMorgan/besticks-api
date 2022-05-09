import express from 'express';
import {
  getOneUser,
  updateUser,
  deleteUser,
  getUserEvents,
} from './user.js';

import {
  getAllOrganisations,
  getOneOrganisations,
} from './organisations.js';
import authMiddleware from '../../core/middlewares/authMiddleware.js';
import {
  getAllEvents,
  getOneEventById,
  getHighlightedEvents, buyATicket,
} from './event.js';

const router = express.Router();

/**
 * ORGANISATIONS
 */
router.get('/organisations', getAllOrganisations);
router.get('/organisations/:id', getOneOrganisations);

/**
 * USERS
 */
router.get('/users/:id', authMiddleware, getOneUser);
router.get('/users/events/:id', authMiddleware, getUserEvents);
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

/**
 * EVENTS
 */
router.get('/events', getAllEvents);
router.get('/events/highlighted', getHighlightedEvents);
router.get('/events/:id', getOneEventById);
router.put('/events/buy', buyATicket);

export default router;
