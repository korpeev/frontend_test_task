import { createContext } from "react";
import { ProductContextInitValues } from "../common";

export const ProductContext = createContext<ProductContextInitValues>(
  {} as ProductContextInitValues
);
