const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailconfig = require('../config/email');

// crea un objeto transporter reusable usa el SMTP transport default
let transporter = nodemailer.createTransport({
  host: emailconfig.host,
  port: emailconfig.port,
  auth: {
    user: emailconfig.user,
    pass: emailconfig.pass,
  },
});
// generar html
const generarHTML = (archivo, opciones={}) => {
  const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
  return juice(html);
}
// envio de mail con objeto transporte definido
exports.enviar = async (opciones) => {
  const html = generarHTML(opciones.archivo, opciones);
  const text = htmlToText.fromString(html);
  let info = await transporter.sendMail({
    from: 'UpTask <no-reply@uptask.com>', // remitentes
    to: opciones.usuario.email, // receeeptores
    subject: opciones.subject, // Subject line
    text, // plain text body
    html // html body
  });

  const enviarEmail = util.promisify(transporter.sendMail, transporter);
  return enviarEmail.call(transporter, info);

}
