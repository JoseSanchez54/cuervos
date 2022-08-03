import axios from "axios";

export default async (req, res) => {
  const { username, password } = req.body;
  const data = {
    username,
    password,
  };
  const wcForm = {
    email: username,
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
  const wcCustomer = WooCommerce.post("customers", wcForm)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  const response = await axios
    .post(process.env.URLBASE + "wp-json/api/v1/token", data)
    .then((re) =>
      res.status(200).json({
        token: re.data.jwt_token,
        expires: re.data.expires_in,
        iat: re.data.iat,
        id: resWP.id,
        username: resWP.user_nicename,
        email: resWP.user_email,
      })
    );
};
