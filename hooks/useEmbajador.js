import useSWR from "swr";

export const useEmbajador = (initialdata) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, isValidating, error } = useSWR(
    process.env.URLBASE + "/wp-json/jet-cct/embajadores",
    fetcher,
    {
      fallbackData: [initialdata],
    }
  );

  return {
    isLoading: !error && !data,
    embajadores: data,
    isError: error,
    isValidating,
  };
};