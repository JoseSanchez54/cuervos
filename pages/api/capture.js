import * as paypal from "../../utils/paypal-api";

export default async (req, res) => {
  const { orderID } = req.params;
  console.log(req.method);

  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
