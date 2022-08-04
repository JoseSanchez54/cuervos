import useSWR from "swr";

export const useVariations = (id) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isValidating, mutate } = useSWR(
    "/api/variaciones?id=" + id,
    fetcher
  );

  return {
    isLoading: !error && !data,
    variacion: data,
    setVariacion: mutate,
    isError: error,
    isValidating,
  };
};
