import useSWR from "swr";
import fetcherWc from "../utils/fetcherWc";

export const useProducts = (initialdata, categoria) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isValidating, mutate } = useSWR(
    "products?per_page=50products&status=publish&category=" + categoria,
    fetcherWc,
    {
      fallbackData: initialdata,
      categoria: categoria,
      refreshInterval: 1000,
    }
  );

  return {
    isLoading: !error && !data,
    products: data,
    setProducts: mutate,
    isError: error,
    isValidating,
  };
};
