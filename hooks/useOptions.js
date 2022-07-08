import useSWR from "swr";
import { useMemo } from "react";

export const useOptions = (initialdata) => {
  const { data, isValidating, error } = useSWR(
    process.env.URLBASE + "wp-json/jet-cct/opciones_generales",
    {
      fallbackData: [initialdata],
    }
  );

  return {
    isLoading: !error && !data,
    options: data[0],
    isError: error,
    isValidating,
  };
};
