import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import { MY_EMAIL, MY_PASSWORD } from "./constants.js";
const app = express();
const port = 3950;

app.use(cors());
app.use(express.json({limit: "25mb"}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});


function sendEmail({ recipient_email, name, subject, message }) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: MY_EMAIL,
                pass: MY_PASSWORD
            },
        });

        const mail_configs = {
            from: recipient_email,
            to: MY_EMAIL,
            subject: subject,
            text:  `Mensaje de: ${name} \n Asunto: ${subject} \n Email: ${recipient_email} \n Mensaje: ${message}`
        };

        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error)
                return reject({message: "Occuriò un error"})
            }
            return resolve({message: "Email enviado"})
        })
    })
}

app.post("/send_email", (req, res) => {
    sendEmail(req.body)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
})

app.listen(port, () => {
    console.log(`nodemailerProject is listening at http://localhost:${port}`);
});



// traer el formulario




