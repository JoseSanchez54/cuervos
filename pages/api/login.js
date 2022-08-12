import axios from "axios";

export default async (req, res) => {
  const { username, password } = req.body;
  const data = {
    username,
    password,
  };

  const resWP = await axios
    .post(
      process.env.URLBASE +
        "/wp-json/custom-plugin/login?username=" +
        username +
        "&password=" +
        password
    )
    .then((e) => e.data.data);

  const response = await axios
    .post(process.env.URLBASE + "/wp-json/jwt-auth/v1/token", data)
    .then((re) =>
      res.status(200).json({
        token: re.data.token,
        username: resWP.user_nicename,
        email: resWP.user_email,
      })
    );
};
