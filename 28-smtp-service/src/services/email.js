const nodemailer = require('nodemailer');

let configGlobalSMTP = null;
let transporter = null;

function buildTransportOptions(configSMTP) {
  if (configSMTP.service) {
    return {
      service: configSMTP.service,
      secure: configSMTP.secure,
      auth: {
        user: configSMTP.user,
        pass: configSMTP.pass,
      },
    };
  }

  const options = {
    host: configSMTP.host,
    port: configSMTP.port,
    secure: configSMTP.secure,
  };

  if (configSMTP.user && configSMTP.pass) {
    options.auth = {
      user: configSMTP.user,
      pass: configSMTP.pass,
    };
  }

  return options;
}

function createTransport(configSMTP) {
  configGlobalSMTP = configSMTP;
  const options = buildTransportOptions(configSMTP);

  transporter = nodemailer.createTransport(options);

  transporter.verify((error) => {
    if (error) {
      console.error(`SMTP verify error: ${error.message}`);
    } else {
      console.log('SMTP server is ready to take our messages');
    }
  });

  return transporter;
}

function send(message) {
  if (!transporter) {
    const error = new Error('SMTP transporter not initialized');
    error.responseCode = 550;
    throw error;
  }

  const defaultFrom = configGlobalSMTP.user || 'no-reply@local.test';
  const resolvedMessage = {
    from: message.from || defaultFrom,
    ...message,
  };

  return transporter.sendMail(resolvedMessage);
}

module.exports = { createTransport, send };
