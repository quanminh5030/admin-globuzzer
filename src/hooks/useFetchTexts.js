import { useState } from "react";
import useFetch from "./useFetch";

export const useFetchTexts = (id) => {
  const { items } = useFetch('section_items');
  const [texts, setTexts] = useState([]);

  items.map((item) => {
    if (id === item.id) {
      setTexts(item.banner.texts);
    }
    return texts
  });
  return {texts};
};
