import { ProductCard } from "./product.card";
import { useProductContext } from "hooks/context";
import { usePagination } from "hooks/usePagination";

export const ProductContainer = () => {
  const { products } = useProductContext();
  const { currentItems, pageNumbers, setCurrentPage, currentPage } =
    usePagination({
      items: products,
    });
  const onPrevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  };
  const onNextPage = () => {
    if (currentPage >= pageNumbers.length) return;
    setCurrentPage(currentPage + 1);
  };
  const onGoToPage = (page: number) => () => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="flex flex-col mt-5 p-5 space-y-5">
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {currentItems.length > 0 && (
        <div className="flex justify-between items-center mt-5">
          <button onClick={onPrevPage}>Назад</button>
          <div className="flex items-center space-x-2">
            {pageNumbers.map((num) => (
              <span
                onClick={onGoToPage(num)}
                key={num}
                className={`rounded cursor-pointer text-[16px] border border-2 border-gray-600 py-1 px-3 flex items-center justify-center ${
                  num === currentPage
                    ? "bg-emerald-400 text-white border-transparent"
                    : ""
                }`}>
                {num}
              </span>
            ))}
          </div>
          <button onClick={onNextPage}>Вперёд</button>
        </div>
      )}
    </>
  );
};
