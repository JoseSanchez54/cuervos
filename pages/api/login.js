import axios from "axios";

export default async (req, res) => {
  const { username, password } = req.body;
  const response = await axios.post(
    process.env.URLBASE + "wp-json/jwt-auth/v1/token",
    {
      username,
      password,
    }
  );
  return res.status(200).json(response);
};
