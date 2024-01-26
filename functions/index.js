const nodemailer = require("nodemailer");
//const pdf = require("pdf-creator-node");
//const fs = require("fs");
//const path = require("path");

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "m.crisman20@gmail.com",
    pass: 'jgvw xacy yiyz hshb'
  }
});


async function sendEmailRechazo(Data) {
  return transport.sendMail({
    subject: "Rechazo de formulario de Transporte App",
    to: Data.email,
    html: `<h3> Tu registro ha sido rechazado de transporte App</h3>
        <p>Email: ${Data.email}</p>
        <p>Nombre: ${Data.name}</p>
        <p>Razon: ${Data.reason}</p>`,
  })
    .catch((e) => {
      console.log('Emailer', e);
    });
}

async function sendEmailAceptacion(Data) {
  return transport.sendMail({
    subject: "Aprobación de formulario de Transporte App",
    to: Data.email,
    html: `<h3> Tu registro ha sido aprobado en transporte App</h3>
        <p>Email: ${Data.email}</p>
        <p>Nombre: ${Data.name}</p>`,
  })
    .catch((e) => {
      console.log('Emailer', e);
    });
}

async function sendEmailSuscriptionEstudiante(Data) {
  return transport.sendMail({
    subject: "Ha enviado una suscripción de Transporte App ✔",
    to: Data.email,
    html: `<h3>Estimado  ${Data.name},</h3>
    <p>Su suscripción ha sido ingresada con éxitos para el aviso <b>${Data.title}</b>, 
    espere que el conductor acepte su solicitud.</p>`,
  })
}

async function sendEmailSuscriptionConductor(Data) {
  return transport.sendMail({
    subject: "Ha recibido una suscripción de Transporte App ✔",
    to: Data.email,
    html: `<h3>Estimado ${Data.name},</h3>
    <p>Ha recibido un nuevo suscriptor para su aviso <b>${Data.title}</b>, 
    por favor ingrese al aplicativo y gestione su solitud.</p>`,
  });
  //console.log("Message sent: %s", info.messageId);
  //return(info);
}

async function sendEmailAcptarSuscription(Data) {
  return transport.sendMail({
    subject: "Aprobación de suscripción de Transporte App ",
    to: Data.email,
    html: `<h3>Estimado ${Data.name},</h3>
    <p>Tu suscripción para el aviso <b>${Data.title}</b> ha sido aprobada con éxito por el conductor, 
    recuerda que la hora de salida es <b>${Data.hora}</b>.</p>
    <p>Ya puedes descargar tu boleto en la aplicación.</p>`,
  })
}

async function sendEmailRechazarSuscription(Data) {
  return transport.sendMail({
    subject: "Suscripción rechazada de Transporte App",
    to: Data.email,
    html: `<h3>Estimado ${Data.name},</h3>
    <p>Tu suscripción para el aviso <b>${Data.title}</b> ha sido rechazada por el conductor, 
    para más información puedes contactarte con el por nuestro chat.</p>`,
  })
}

async function sendEmailCancelarSuscription(Data) {
  return transport.sendMail({
    subject: "Suscripción cancelada de Transporte App",
    to: Data.email,
    html: `<h3>Estimado ${Data.name},</h3>
    <p>Tu suscripción para el aviso <b>${Data.title}</b> ha sido cancelada por el conductor, 
    para más información puedes contactarte con el por nuestro chat.</p>`,
  })
}



module.exports = {
  sendEmailRechazo,
  sendEmailAceptacion,
  sendEmailSuscriptionEstudiante,
  sendEmailSuscriptionConductor,
  sendEmailAcptarSuscription,
  sendEmailRechazarSuscription,
  sendEmailCancelarSuscription
};
