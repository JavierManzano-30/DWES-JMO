const express = require('express');
const emailService = require('../services/email');
const config = require('../config');

const router = express.Router();

emailService.createTransport(config.smtp);

router.post('/', async (req, res, next) => {
  try {
    const { to, subject, text, html, from } = req.body || {};

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['to', 'subject', 'text or html'],
      });
    }

    const message = {
      from,
      to,
      subject,
      text,
      html,
    };

    const info = await emailService.send(message);

    return res.status(200).json({
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
