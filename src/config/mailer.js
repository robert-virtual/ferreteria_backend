const nodemailer = require("nodemailer");

exports.genPin = () => {
  const { random, round } = Math;
  return `${round(random() * 9999) + 1000}`;
};

exports.getHtml = (code) => {
  return `
    <header>
        <p>Codigo de Recuperacion</p>
        <p>Ferreteria Movil</p>
    </header>
    <section>
        <p>Copia el pin e ingresalo en la aplicacion</p>
        <h1>${code}</h1>
    </section>
    `;
};

exports.transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAILER_SECRET,
  },
});
