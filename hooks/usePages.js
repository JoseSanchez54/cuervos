import useSWR from "swr";
import { useMemo } from "react";

export const usePages = (initialdata = undefined, pagina) => {
  const { data, error, isValidating, mutate } = useSWR(
    process.env.URLBASE + "/wp-json/jet-cct/paginas",
    { fallbackData: [initialdata] }
  );

  const home2 = data.find((page) => page?.pagina_asociada === pagina);

  const listMemo = useMemo(() => (home2 ? home2 : []), [data]);

  return {
    isLoading: !error && !data,
    isError: error,
    isValidating,
    data: listMemo,
  };
};
