import Organisation from '../../core/models/organisation.js';

export const getAllOrganisations = async (req, res) => {
  try {
    const organisations = await Organisation.find();
    res.status(200).json(organisations);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getOneOrganisations = async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id);
    res.status(200).json(organisation);
  } catch (error) {
    res.status(500).json({ error });
  }
};
