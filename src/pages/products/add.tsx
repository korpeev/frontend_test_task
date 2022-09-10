import { Product } from "components/product/product";

export const ProductCreate = ({ Edit }: { Edit?: boolean }) => {
  return <Product isEdit={!!Edit} />;
};
