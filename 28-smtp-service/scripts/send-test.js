const nodemailer = require('nodemailer');
const config = require('../src/config');

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

async function main() {
  const transporter = nodemailer.createTransport(
    buildTransportOptions(config.smtp)
  );

  const info = await transporter.sendMail({
    from: config.smtp.user || 'no-reply@local.test',
    to: process.env.MAIL_TO || 'destino@correo.com',
    subject: process.env.MAIL_SUBJECT || 'Prueba automatica',
    text: process.env.MAIL_TEXT || 'Hola desde npm run send-test',
  });

  console.log('Message sent: %s', info.messageId);
}

main().catch((error) => {
  console.error('Error sending email:', error.message);
  process.exitCode = 1;
});
