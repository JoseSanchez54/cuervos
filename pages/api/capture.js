import * as paypal from "../../utils/paypal-api";

export default async (req, res) => {
  console.log(req.query);
  const { orderID } = req.query;

  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
