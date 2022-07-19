import { useRouter } from "next/router";
import useSWR from "swr";
const Success = () => {
  const {
    query: { session_id, wc_order_id },
  } = useRouter();

  const { data, error } = useSWR(() => `/api/checkout_sessions/${session_id}`);
  console.log(data);
};

export default Success;
