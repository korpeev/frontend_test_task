import { CityProductPrice, Product } from "./entity.types";
import { AlertOptions } from "./other.types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface ProductContextInitValues {
  addProduct: (product: Omit<Product, "id">) => void;
  removeProduct: (id: number) => void;
  editProduct: (id: number, editProductInput: Omit<Product, "id">) => void;
  products: Product[];
  cities: CityProductPrice[];
  setCities: Dispatch<SetStateAction<CityProductPrice[]>>;
  onChangeSearchTerm: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

export interface AlertContextInitValues {
  alert: AlertOptions;
  openAlert: (options: AlertOptions) => void;
  closeAlert: () => void;
}
