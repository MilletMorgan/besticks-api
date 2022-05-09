import Organisation from '../../core/models/organisation.js';
import Event from '../../core/models/event.js';

import { error, check } from '../../utils/utils.js';

export const getOneOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id);
    res.status(200).json(organisation);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAllOrganisation = async (req, res) => {
  try {
    const organisations = await Organisation.find();
    res.status(200).json(organisations);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findOne({ name: req.body.name });
    check(!organisation, 'duplicated_organisation', 500);
    const request = new Organisation({
      createdAt: new Date(),
      name: req.body.name,
      type: req.body.type,
      address: req.body.address,
      phone: req.body.phone,
    });
    request.save().then(() => res.status(201).json({
      message: 'organisation_successfully_created',
    }));
  } catch (e) {
    error(res, e);
  }
};

export const deleteOrganisation = async (req, res) => {
  try {
    await Organisation.findByIdAndDelete(req.param.id);
    res.status(200).json('organisation_successfully_deleted');
  } catch (e) {
    error(res, e);
  }
};

export const updateOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id);
    check(!organisation, 'organisation_not_found', 404);
    organisation.createdAt = new Date();
    organisation.name = req.body.name || organisation.name;
    organisation.type = req.body.type || organisation.type;
    organisation.address = req.body.address || organisation.address;
    organisation.phone = req.body.phone || organisation.phone;
    await organisation.save();
  } catch (e) {
    error(res, e);
  }
};

export const getOrganisationEvents = async (req, res) => {
  try {
    const myEvents = await Event.find({ organisation: req.params.id });
    res.status(200).json(myEvents);
  } catch (e) {
    error(res, e);
  }
};
