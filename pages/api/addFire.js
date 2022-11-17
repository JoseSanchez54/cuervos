import { getMail, addMail } from "../../utils/connect";
export default async (req, res) => {
  if (req.method === "POST") {
    const { newMail, phone, nombre } = req.body;
    const mails = await getMail();
    const mail = mails.find((mail) => mail.mail === newMail);
    if (!mail) {
      await addMail(newMail, phone, nombre);
    }

    res.status(200).json({ message: "Mail agregado" });
  }
  if (req.method === "GET") {
    const mails = await getMail();
    const mail = mails.find((mail) => mail.mail === datos.email);
  }

  return res.status(200).json(mails);
};
