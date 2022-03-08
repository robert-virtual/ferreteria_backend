const nodemailer = require("nodemailer");

exports.genPin = () => {
  const { random, round } = Math;
  return `${round(random() * 9999) + 1000}`;
};

exports.getHtml = (code) => {
  return `
        <html style="font-family: sans-serif">
        <body style="padding: 0; margin: 0">
            <main>
            <header style="background-color: #10b981; padding: 0.5rem; color: white">
                <p style="font-size: 1.5rem">Codigo de Recuperacion</p>
                <p>Ferreteria Movil</p>
            </header>
            <section style="padding: 0.5rem; display: flex; flex-direction: column">
                <h1
                style="
                    color: #10b981;
                    font-size: 2rem;
                    letter-spacing: 0.5rem;
                    font-weight: bold;
                "
                >
                ${code}
                </h1>
                <p style="font-size: 1.25rem; color: gray">
                Copia el pin e ingresalo en la aplicacion
                </p>
            </section>
            </main>
        </body>
        </html>
        `;
};

exports.transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAILER_SECRET,
  },
});
