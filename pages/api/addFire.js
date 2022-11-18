import { getMail, addMail } from "../../utils/connect";

export default async (req, res) => {
  if (req.method === "POST") {
    const { newMail, phone, nombre, secreto } = req.body;
    if (process.env.SECRETO === secreto) {
      const mails = await getMail();
      const mail = mails.find((mail) => mail.mail === newMail);
      if (!mail) {
        await addMail(newMail, phone, nombre, "criacuervos");
      }

      res.status(200).json({ message: "Error" });
    }
  }
};
