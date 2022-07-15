import useSWR from "swr";

export const useProduct = (initialdata, id) => {
  const { data, error, isValidating, mutate } = useSWR("/api/producto", {
    fallbackData: initialdata,
    id: id,
    refreshInterval: 10000,
  });

  return {
    isLoading: !error && !data,
    product: data,
    setProducts: mutate,
    isError: error,
    isValidating,
  };
};
