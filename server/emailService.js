const nodemailer = require("nodemailer");
const mysql = require("mysql12");

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "sonapass",
  database: process.env.DB_NAME || "form-eval",
  port: 3306,
});

// Function to fetch mailing configuration from the database
function fetchMailingConfig(callback) {
  const configQuery =
    'SELECT param_key, param_value FROM parametres_de_base WHERE param_key IN ("Serveur_msgr", "Port_msgr")'; /* "SMTP_username", "SMTP_password" */
  db.query(configQuery, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return callback(err);
    }
    if (results.length === 0) {
      const error = new Error("Incomplete mailing configuration found");
      console.error(error);
      return callback(error);
    }
    const mailingConfig = results.reduce((config, row) => {
      config[row.param_key] = row.param_value;
      return config;
    }, {});
    callback(null, mailingConfig);
  });
}

const sendEmail = (to, subject, text) => {
  return new Promise((resolve, reject) => {
    fetchMailingConfig((err, config) => {
      if (err) {
        return reject(err);
      }

      const transporter = nodemailer.createTransport({
        host: config.Serveur_msgr,
        port: config.Port_msgr,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        text,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(error);
        }
        resolve(info);
      });
    });
  });
};

module.exports = { sendEmail };
