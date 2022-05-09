export const error = (res, e) => {
  res.status(e.code || 500).json({ error: e.message || e });
  // eslint-disable-next-line no-console
  console.error(e);
};

export const check = (elmt, message, code) => {
  if (!elmt) {
    throw { code: code || 400, message };
  }
};
