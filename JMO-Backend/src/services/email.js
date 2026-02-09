import nodemailer from 'nodemailer';
import config from '../config.js';

let transporter = null;

export function buildTransportOptions(smtpConfig) {
  if (smtpConfig.service) {
    return {
      service: smtpConfig.service,
      secure: smtpConfig.secure,
      auth: smtpConfig.user && smtpConfig.pass ? { user: smtpConfig.user, pass: smtpConfig.pass } : undefined,
    };
  }

  const options = {
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
  };

  if (smtpConfig.user && smtpConfig.pass) {
    options.auth = {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    };
  }

  return options;
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport(buildTransportOptions(config.smtp));
  }

  return transporter;
}

export async function sendEmail(message) {
  const mailer = getTransporter();
  const defaultFrom = config.smtp.from || config.smtp.user || 'no-reply@local.test';
  const payload = {
    ...message,
    from: message.from || defaultFrom,
  };

  return mailer.sendMail(payload);
}

export function resetMailer() {
  transporter = null;
}
