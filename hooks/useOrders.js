import useSWR from "swr";

export const useOrders = (initialdata) => {
  const { data, error, isValidating, mutate } = useSWR(
    "/api/orders",

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
