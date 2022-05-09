import jwt from 'jsonwebtoken';
import Crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../../core/models/user.js';

import { error, check } from '../../utils/utils.js';
import Organisation from '../../core/models/organisation.js';

const createOrganisationOnSignup = async (organisation) => {
  const existingOrganisation = await Organisation.findOne({ name: organisation.name });
  check(!existingOrganisation, 'duplicated_organisation', 500);
  const newOrganisation = new Organisation({
    name: organisation.name,
    type: organisation.type,
    address: organisation.address,
    phone: organisation.phone,
  });
  await newOrganisation.save();
  return newOrganisation._id;
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    check(user, 'unknown_user', 404);
    const result = await bcrypt.compare(req.body.password, user.password);
    check(result, 'bad_request', 400);
    const tokenExpiration = 900000; // expiration of the token in seconds
    res.status(200).json({
      auth: {
        accessToken: jwt.sign(
          { id: user._id, name: user.name },
          process.env.privateKey || 'privateKey',
          { expiresIn: `${tokenExpiration}s` },
        ),
        refreshToken: user.refreshToken,
        token_type: 'bearer',
        expires: tokenExpiration,
      },
      user: {
        role: user.organisation ? 'admin' : 'user',
        ...(user.organisation && { organisation: user.organisation }),
        id: user._id,
      },
    });
  } catch (e) {
    error(res, e);
  }
};

export const signup = async (req, res) => {
  try {
    let organisationId;
    const user = await User.findOne({ email: req.body.email });

    check(!user, 'duplicated_user', 500);

    if (req.body.organisation) {
      organisationId = await createOrganisationOnSignup(req.body.organisation);
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const request = new User({
      createdAt: Date.now(),
      email: req.body.email,
      password: hashedPassword,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      birthDate: req.body.birthDate,
      phone: req.body.phone,
      organisation: organisationId || null,
      refreshToken: Crypto.randomBytes(64).toString('hex'),
      admin: false,
    });

    request.save().then(() => res.status(201).json({
      message: 'successfully_created',
    }));
  } catch (e) {
    error(res, e);
  }
};

export const generatePrivateKey = (req, res) => {
  const privateKey = Crypto.randomBytes(64).toString('hex');
  process.env.privateKey = privateKey;
  res.status(200).json({ privateKey });
};

export const generateAccessToken = async (req, res) => {
  try {
    check(req.body.id, 'missing_user_id');
    check(req.body.refreshToken, 'missing_refreshToken');
    const user = await User.findById(req.body.id);
    if (user.refreshToken !== req.body.refreshToken) {
      throw { code: 500, message: 'unknown_refresh_token' };
    }
    res.status(200).json({
      accessToken: jwt.sign(
        { id: user._id, name: user.name },
        process.env.privateKey || 'privateKey',
        { expiresIn: '120s' },
      ),
    });
  } catch (e) {
    error(res, e);
  }
};
