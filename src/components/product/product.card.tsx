import { Button } from "components/ui/Button";
import { FC } from "react";
import { formatNumber } from "utils/formatNumber";
import { useProductContext } from "hooks/context";
import { useNavigate } from "react-router-dom";
import { Product } from "common/entity.types";

export interface Props {
  product: Product;
}
export const ProductCard: FC<Props> = ({ product }) => {
  const { removeProduct } = useProductContext();
  const navigate = useNavigate();
  const getPrice = Array.isArray(product.price)
    ? product.price[Math.floor((product.price.length - 1) / 2)].price
    : product.price;
  return (
    <div className="flex items-center justify-between">
      <img src={product.media[0]} className="h-[64px] w-[64px] rounded" />
      <div className="flex flex-col items-center">
        <span>Название</span>
        <span className="font-bold">{product.title}</span>
      </div>
      <div className="flex flex-col items-center">
        <span>Статус</span>
        <span className="bg-emerald-400 text-white rounded-full p-1 px-2 uppercase">
          {product.isActive}
        </span>
      </div>
      <div className="flex flex-col">
        <span>Цена</span>
        <span className="uppercase">{formatNumber(getPrice as number)}</span>
      </div>
      <Button onClick={() => navigate(`/products/edit/${product.id}`)}>
        {" "}
        Изменить
      </Button>
      <Button onClick={() => removeProduct(product.id)} className="bg-red-600">
        {" "}
        Удалить
      </Button>
    </div>
  );
};
