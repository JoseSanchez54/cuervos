import useSWR from "swr";
import fetcherWc from "../utils/fetcherWc";

export const useOrders = (initialdata) => {
  const { data, error, isValidating, mutate } = useSWR(
    "orders",
    fetcherWc,

    {
      fallbackData: initialdata,
    }
  );

  return {
    isLoading: !error && !data,
    orders: data,
    setOrders: mutate,
    isError: error,
    isValidating,
  };
};
