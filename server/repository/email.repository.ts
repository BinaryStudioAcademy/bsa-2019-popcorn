import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const send = async msg => {
  return await sgMail.send(msg);
};
