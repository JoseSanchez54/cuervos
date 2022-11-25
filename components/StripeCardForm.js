import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Formulario from "./Formulario";
const StripeCardForm = ({ items, cupon }) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  return (
    <Elements stripe={stripePromise}>
      <Formulario cupon={cupon} items={items} />
    </Elements>
  );
};
export default StripeCardForm;
