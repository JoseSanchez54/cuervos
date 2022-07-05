import useSWR from "swr";
import { useMemo } from "react";

export const useOptions = (initialdata) => {
  const { data, isValidating, error } = useSWR(
    process.env.URLBASE + "wp-json/jet-cct/opciones_generales",
    {
      fallbackData: initialdata,
    }
  );

  if (initialdata === "") {
    initialdata = [];
  }

  const listMemo = useMemo(() => (data ? data : [initialdata]), [data]);

  return {
    isLoading: !error && !data,
    options: listMemo,
    isError: error,
    isValidating,
  };
};
