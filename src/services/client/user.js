import User from '../../core/models/user.js';
import Event from '../../core/models/event.js';

import { error, check } from '../../utils/utils.js';

export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    check(!user, 'user_not_found', 404);
    user.createdAt = new Date();
    user.name = req.body.name || user.name;
    user.type = req.body.type || user.type;
    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;
    await user.save();
  } catch (e) {
    error(res, e);
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('eventsPurchased');
    res.status(200).json(user.eventsPurchased);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.param.id);
    res.status(200).json('user_successfully_deleted');
  } catch (e) {
    error(res, e);
  }
};
