import useSWR from "swr";
import { useMemo } from "react";

export const useProducts = (initialdata) => {
  const { data, error, isValidating, mutate } = useSWR("/api/test", {
    fallbackData: initialdata,
    refreshInterval: 10000,
  });

  return {
    isLoading: !error && !data,
    products: data,
    setProducts: mutate,
    isError: error,
    isValidating,
  };
};
