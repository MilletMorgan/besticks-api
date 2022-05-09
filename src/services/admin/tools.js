/* eslint-disable import/prefer-default-export */
import {
  categoriesCache,
  eventsCache,
} from '../../utils/caches.js';

import { error } from '../../utils/utils.js';

export const flushCache = (req, res) => {
  try {
    categoriesCache.flushAll();
    eventsCache.flushAll();
    res.status(200).json({
      message: 'Cache flushed',
    });
  } catch (e) {
    error(res, e);
  }
};
