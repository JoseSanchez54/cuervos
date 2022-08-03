import useSWR from "swr";

export const useProducts = (initialdata, categoria) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isValidating, mutate } = useSWR("/api/test", fetcher, {
    fallbackData: initialdata,
    categoria: categoria,
    refreshInterval: 1000,
  });

  return {
    isLoading: !error && !data,
    products: data,
    setProducts: mutate,
    isError: error,
    isValidating,
  };
};
