import useSWR from "swr";

export const useProduct = (initialdata, id) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isValidating, mutate } = useSWR(
    "/api/producto",
    fetcher,
    {
      fallbackData: initialdata,
      id: id,
      refreshInterval: 1000,
    }
  );

  return {
    isLoading: !error && !data,
    product: data,
    setProducts: mutate,
    isError: error,
    isValidating,
  };
};
