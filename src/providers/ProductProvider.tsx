import { ChangeEvent, FC, PropsWithChildren, useEffect, useState } from "react";
import { ProductContext } from "context/ProductContext";
import { CityProductPrice, Product } from "../common";
import { productService } from "services/product.service";
import useDebounce from "hooks/useDounce";

export const ProductProvider: FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [cities, setCities] = useState<CityProductPrice[] | []>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 300);

  useEffect(() => {
    productService.getBySearchTerm(debouncedValue).then((product) => {
      setProducts(product);
    });
  }, [debouncedValue]);
  useEffect(() => {
    productService.getAll().then((products) => {
      setProducts(products);
    });
    productService.getCities().then((cities) => {
      const newCities = cities.map((city) => ({ ...city, price: 0 }));
      setCities(newCities);
    });
  }, []);
  const removeProduct = (id: number) => {
    productService.remove(id).then(() => {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    });
  };
  const editProduct = (id: number, editInput: Omit<Product, "id">) => {
    productService.edit<Omit<Product, "id">>(id, editInput).then((data) => {
      const editedProduct = (prevState: Product[]) =>
        prevState.map((product) => {
          if (product.id === id) {
            return data;
          }
          return product;
        });

      setProducts(editedProduct);
    });
  };
  const addProduct = (product: Omit<Product, "id">) => {
    productService.create(product).then((product) => {
      setProducts((prev) => [...prev, product]);
    });
  };
  const onChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <ProductContext.Provider
      value={{
        removeProduct,
        addProduct,
        editProduct,
        products,
        cities,
        setCities,
        onChangeSearchTerm,
        searchTerm,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
