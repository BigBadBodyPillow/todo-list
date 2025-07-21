module.exports.validateRequest = (req, res, next) => {
  const contentType = req.headers['content-type'];
  // json
  if (!contentType.includes('application/json'))
    return res.status(415).json({ error: 'Only JSON content allowed' });

  // lenght
  if (req.body.task && req.body.task.length > 140)
    return res.status(400).json({ error: 'Task exceeds 140 characters' });

  // gmail
  const username = req.user?.email || req.body?.email;
  if (username && !username.endsWith('@gmail.com'))
    return res
      .status(403)
      .json({ error: 'Forbidden: must use a @gmail.com account' });

  next();
};
