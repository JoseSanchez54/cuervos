import useSWR from "swr";
import { useMemo, useCallback } from "react";

export const usePost = (init) => {
  const { data, error, isValidating, mutate } = useSWR(
    process.env.URLBASE + "wp-json/wp/v2/allposts/",
    {
      initialData: init,
    }
  );
  const listMemo = useMemo(() => (data ? data : []), [data]);

  const getCategory = useCallback(
    (categoria) => {
      const category = listMemo.filter((item) => {
        if (item?.category.lenght > 0) {
          return item.category[0].name === categoria;
        } else {
          return null;
        }
      });
      return category;
    },
    [listMemo]
  );
  const getCategoryBySlug = useCallback(
    (categoria) => {
      const category = listMemo.filter((item) =>
        item.category.find((slug) => slug.slug === categoria)
      );
      return category;
    },
    [listMemo]
  );
  const getPostBySlug = useCallback(
    (slug1) => {
      const slug = listMemo.filter((item) => item.slug === slug1);
      return slug;
    },
    [listMemo]
  );
  const getCategories = useCallback(() => {
    let arrayfinal = [];
    listMemo.map((item) =>
      item.category.map((cat) => {
        const objeto = JSON.stringify(cat);
        if (!arrayfinal.includes(objeto)) {
          arrayfinal.push(objeto);
        }
      })
    );
    return arrayfinal;
  }, [listMemo]);

  return {
    isLoading: !error && !data,
    posts: listMemo,
    setPosts: mutate,
    isError: error,
    isValidating,
    getCategory,
    getPostBySlug,
    getCategories,
    getCategoryBySlug,
  };
};
