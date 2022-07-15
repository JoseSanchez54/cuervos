import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  const arrayEnvios = await WooCommerce.get("shipping/zones")
    .then((response) => {
      response.data.map((e) => {
        let id = e.id;
        WooCommerce.get("shipping/zones/" + id + "/locations")
          .then((response1) => {
            return arrayEnvios.push(response1.data);
          })
          .catch((error) => {
            console.log(error?.response1?.data);
          });
      });
    })

    .catch((error) => {
      console.log("err", error);
    });

  return res.status(200).json(arrayEnvios);
};
