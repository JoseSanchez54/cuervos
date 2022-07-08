import useSWR from "swr";

export const usePages = (initialdata, pagina) => {
  const { data, error, isValidating, mutate } = useSWR(
    process.env.URLBASE + "/wp-json/jet-cct/paginas",
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
