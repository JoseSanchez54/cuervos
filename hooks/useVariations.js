import useSWR from "swr";

export const useVariations = (id) => {
  const { data, error, isValidating, mutate } = useSWR(
    "/api/variaciones?id=" + id
  );

  return {
    isLoading: !error && !data,
    variacion: data,
    setVariacion: mutate,
    isError: error,
    isValidating,
  };
};
