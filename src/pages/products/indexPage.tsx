import { Button } from "components/ui/Button";
import { ProductContainer } from "components/product";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "hooks/context";

export const ProductsPage = () => {
  const navigate = useNavigate();
  const { searchTerm, onChangeSearchTerm } = useProductContext();
  return (
    <div className="w-1/2 rounded shadow-md p-5 ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Товары</h1>
        <Button onClick={() => navigate("/products/create")}>Добавить</Button>
      </div>

      <div className="h-[1px] mt-5 w-full bg-gray-400" />
      <div className="flex flex-col space-y-2 my-5">
        <h1 className="text-xl font-bold text-center">
          Поиск по названию {searchTerm}
        </h1>
        <input
          value={searchTerm}
          onChange={onChangeSearchTerm}
          className="rounded p-2 border-2"
        />
      </div>
      <ProductContainer />
    </div>
  );
};
