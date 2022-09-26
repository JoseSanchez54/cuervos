const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP,
  server: process.env.MAILCHIMPSERVER,
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

export default run;
