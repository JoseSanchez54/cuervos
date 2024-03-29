import WooCommerce from "../../woocommerce/Woocommerce";
import * as Sentry from "@sentry/nextjs";
export default async (req, res) => {
  const { datos } = req.body;
  const bizSdk = require("facebook-nodejs-business-sdk");
  const process = require("process");
  const ServerEvent = bizSdk.ServerEvent;
  const EventRequest = bizSdk.EventRequest;
  const UserData = bizSdk.UserData;
  const CustomData = bizSdk.CustomData;
  const Content = bizSdk.Content;

  const access_token = process.env.FB_ACCESS_TOKEN;
  const pixel_id = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  void (async function () {
    try {
      if (access_token === undefined || pixel_id === undefined) {
        throw new Error(
          `"Missing required test config. Got pixel_id: '${pixel_id}', access_token: '${access_token}'"`
        );
      }
      const api = bizSdk.FacebookAdsApi.init(access_token);
      let current_timestamp = Math.floor(new Date() / 1000);

      if (datos.eventName === "Purchase") {
        const order = await WooCommerce.get("orders/" + datos.eventID)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            Sentry.captureException(error);
            console.log(error.response.data);
          });
        const ids = [];

        await order?.line_items.forEach((item) => {
          const to = {
            id: item.product_id,
            quantity: 1,
          };
          ids.push(to);
        });

        const productos = [];
        ids.forEach((element) => {
          const content = new Content().setId(element.id).setQuantity(1);
          productos.push(content);
        });

        const userData1 = new UserData()
          .setFbp(datos.fbp)
          .setFbc(datos.fbc)
          .setEmail(order.billing.email)
          .setPhone(order.billing.phone)
          .setFirstName(order.billing.first_name)
          .setLastName(order.billing.last_name)
          .setCity(order.billing.city)
          .setState(order.billing.state)
          .setZip(order.billing.postcode)
          .setCountry(order.billing.country)
          .setClientIpAddress(req.connection.remoteAddress)
          .setClientUserAgent(req.headers["user-agent"]);
        const customData1 = new CustomData()
          .setContents(productos)
          .setCurrency(datos.currency)
          .setValue(order.total);
        const serverEvent1 = new ServerEvent()
          .setEventName("Purchase")
          .setEventTime(current_timestamp)
          .setUserData(userData1)
          .setCustomData(customData1)
          .setEventSourceUrl(req.headers.referer)
          .setActionSource("website");
        const eventRequest1 = new EventRequest(
          access_token,
          pixel_id
        ).setEvents([serverEvent1]);
        //.setTestEventCode("TEST20324");

        Promise.all([eventRequest1.execute()]).then(
          (response) => {
            /* console.log(
                "Execute 2 Requests OK. URL:" +
                  req.headers.referer +
                  "Response: ",
                response
              ); */
          },
          (err) => {
            Sentry.captureException(err);
            console.log("Error: ", err);
          }
        );
        /*        try {
            axios.post("/api/addFire", {
              newMail: order.billing.email,
              nombre: order.billing.first_name,
              apellido: order.billing.last_name,
              phone: order.billing.phone,
              secreto: process.env.SECRETO,
            });
          } catch (error) {
            Sentry.captureException(error);
          } */
      } else if (datos.eventName === "AddToCart") {
        const content = new Content()
          .setId(datos.products[0].sku)
          .setQuantity(1);

        const customData = new CustomData()
          .setContents([content])
          .setCurrency("eur")
          .setValue(datos.value);
        const userData1 = new UserData()
          .setFbp(datos.fbp)
          .setClientIpAddress(req.connection.remoteAddress)
          .setClientUserAgent(req.headers["user-agent"]);
        const serverEvent1 = new ServerEvent()
          .setEventName("AddToCart")
          .setEventTime(current_timestamp)
          .setUserData(userData1)
          .setCustomData(customData)
          .setEventSourceUrl(req.headers.referer)
          .setActionSource("website");
        const eventRequest1 = new EventRequest(
          access_token,
          pixel_id
        ).setEvents([serverEvent1]);
        //.setTestEventCode("TEST20324");
        Promise.all([eventRequest1.execute()]).then(
          (response) => {
            /*  console.log(
                "Execute 2 Requests OK. URL:" +
                  req.headers.referer +
                  "Response: ",
                response
              ); */
          },
          (err) => {
            Sentry.captureException(err);
            console.log("Error: ", err);
          }
        );
      } else if (datos.eventName === "ViewContent") {
        const content = new Content().setId(datos.id).setQuantity(1);
        const customData = new CustomData()
          .setContents([content])
          .setCurrency("eur")
          .setValue(datos.price);
        const userData1 = new UserData()
          .setFbp(datos.fbp)
          .setClientIpAddress(req.connection.remoteAddress)
          .setClientUserAgent(req.headers["user-agent"]);
        const serverEvent1 = new ServerEvent()
          .setEventName("ViewContent")
          .setEventTime(current_timestamp)
          .setCustomData(customData)
          .setUserData(userData1)
          .setEventSourceUrl(req.headers.referer)
          .setActionSource("website");
        const eventRequest1 = new EventRequest(
          access_token,
          pixel_id
        ).setEvents([serverEvent1]);
        //.setTestEventCode("TEST20324");
        Promise.all([eventRequest1.execute()]).then(
          (response) => {
            /*  console.log(
                "Execute 2 Requests OK. URL:" +
                  req.headers.referer +
                  "Response: ",
                response
              ); */
          },
          (err) => {
            Sentry.captureException(err);
            console.log("Error: ", err);
          }
        );
      } else if (datos.eventName === "InitiateCheckout") {
        const productos = [];
        await datos.cart.forEach((element) => {
          const content = new Content().setId(element.id).setQuantity(1);
          productos.push(content);
        });
        const customData1 = new CustomData()
          .setContents(productos)
          .setCurrency("eur")
          .setValue(datos.total);
        const userData1 = new UserData()
          .setFbp(datos.fbp)
          .setClientIpAddress(req.connection.remoteAddress)
          .setClientUserAgent(req.headers["user-agent"]);
        const serverEvent1 = new ServerEvent()
          .setEventName("InitiateCheckout")
          .setEventTime(current_timestamp)
          .setCustomData(customData1)
          .setUserData(userData1)
          .setEventSourceUrl(req.headers.referer)
          .setActionSource("website");
        const eventRequest1 = new EventRequest(
          access_token,
          pixel_id
        ).setEvents([serverEvent1]);
        //.setTestEventCode("TEST20324");
        Promise.all([eventRequest1.execute()]).then(
          (response) => {
            /* console.log(
                "Execute 2 Requests OK. URL:" +
                  req.headers.referer +
                  "Response: ",
                response
              ); */
          },
          (err) => {
            Sentry.captureException(err);
            console.log("Error: ", err);
          }
        );
      }
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
      process.exit(1);
    }
  })();
  res.status(200).json({ status: "success" });
};
