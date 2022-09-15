import useSWR from "swr";
import fetcherWc from "../utils/fetcherWc";

export const useVariations = (id) => {
  const { data, error, isValidating, mutate } = useSWR(
    "products/" + id + "/variations" + "?per_page=50",
    fetcherWc
  );

  return {
    isLoading: !error && !data,
    variacion: data,
    setVariacion: mutate,
    isError: error,
    isValidating,
  };
};
