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
    let { formulario, id, tipo } = req.body;
    if (!id) {
      console.log("---------------", formulario);
      await WooCommerce.post("orders", formulario)
        .then((response) => {
          return res.status(200).json(response.data);
        })
        .catch((error) => {
          return res.status(500).json({ Error: "Error en la api" });
        });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const test = await WooCommerce.put("orders/" + id, {
      status: "processing",
      set_paid: true,
    })
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((error) => {
        return res.status(500).json({ Error: "Error en la api" });
      });
  }
};
