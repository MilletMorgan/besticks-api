import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: 'ae7904797ecc495bbca949f017cd79e7',
  clientSecret: 'f21c85b5bd994d57ba32a6feb1da7f43',
  redirectUri: '',
});

const getToken = async (res) => {
  try {
    const { body: response } = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(response.access_token);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const searchArtist = async (req, res) => {
  try {
    await getToken(res);

    const { body: response } = await spotifyApi.searchArtists(req.params.query, { limit: 3 });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getArtistById = async (req, res) => {
  try {
    await getToken(res);

    const { body: response } = await spotifyApi.getArtist(req.params.id);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};
