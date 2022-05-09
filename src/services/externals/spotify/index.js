import express from 'express';
import { searchArtist, getArtistById } from './spotifyApi.js';

const router = express.Router();

router.get('/search-artists/:query', searchArtist);
router.get('/get-artist-by-id/:id', getArtistById);

export default router;
