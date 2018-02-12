const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_SECRET
});


module.exports = {
  contactForm: (req, res) => {
    let data = {
      from: `${req.body.name} <${req.body.email}>`,
      to: "support@hasslefreebeats.com, support@hasslefreebeats.com",
      subject: `${req.body.subject}`,
      text: `${req.body.emailBody}`
    };

    mailgun.messages().send(data, (error, body) => {
      console.log(body);
      if (body.message === "Queued. Thank you.") {
        res.status(200).json("message sent");
      } else {
        res.status(500).json(error);
        console.log(error);
      }
    });
  }
};
