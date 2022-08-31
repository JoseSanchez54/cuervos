import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  if (req.method === "GET") {
    await WooCommerce.get("orders")
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((error) => {
        return res.status(500).json({ Error: "Error en la api" });
      });
  } else if (req.method === "POST") {
    let { formulario, id } = req.body;
    const wcForm = {
      ...formulario,
      payment_method: "paypal",
      payment_method_title: "Paypal",
      set_paid: false,
    };

    if (!id) {
      await WooCommerce.post("orders", wcForm)
        .then((response) => {
          return res.status(200).json(response.data);
        })
        .catch((error) => {
          return res.status(500).json({ Error: "Error en la api" });
        });
    } else {
      await WooCommerce.put("orders/" + id, {
        status: "processing ",
        set_paid: true,
      })
        .then((response) => {
          return res.status(200).json(response.data);
        })
        .catch((error) => {
          return res.status(500).json({ Error: "Error en la api" });
        });
    }
  }
};
