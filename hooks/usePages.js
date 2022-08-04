import useSWR from "swr";

export const usePages = (initialdata, pagina) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isValidating, mutate } = useSWR(
    process.env.URLBASE + "/wp-json/jet-cct/paginas",
    fetcher,
    {
      fallbackData: [initialdata],
    }
  );

  const home2 = data.find((page) => page?.pagina_asociada === pagina);

  return {
    isLoading: !error && !data,
    isError: error,
    isValidating,
    data: home2,
  };
};
