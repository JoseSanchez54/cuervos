import useSWR from "swr";

export const useOrders = (initialdata) => {
  const { data, error, isValidating, mutate } = useSWR(
    "/api/orders",
    { refreshInterval: 1000 },
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
