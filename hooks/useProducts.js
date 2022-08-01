import useSWR from "swr";

export const useProducts = (initialdata, categoria) => {
  const { data, error, isValidating, mutate } = useSWR("/api/test", {
    fallbackData: initialdata,
    categoria: categoria,
  });

  return {
    isLoading: !error && !data,
    products: data,
    setProducts: mutate,
    isError: error,
    isValidating,
  };
};
