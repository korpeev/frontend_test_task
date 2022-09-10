import { useMemo, useState } from "react";
import { Product } from "../common/entity.types";

interface Pagination {
  items: Product[];
  itemsPerPage?: number;
}
export const usePagination = ({ items, itemsPerPage = 5 }: Pagination) => {
  const [currentPage, setCurrentPage] = useState(1);
  const lastElementIndex = currentPage * itemsPerPage;
  const firstElementIndex = lastElementIndex - itemsPerPage;
  const currentItems = useMemo(
    () => items.slice(firstElementIndex, lastElementIndex),
    [items, firstElementIndex, lastElementIndex]
  );

  const pageNumbers: number[] = [];
  for (
    let index = 1;
    index <= Math.ceil(items.length / itemsPerPage);
    index++
  ) {
    pageNumbers.push(index);
  }

  return {
    setCurrentPage,
    pageNumbers,
    currentItems,
    currentPage,
  };
};
