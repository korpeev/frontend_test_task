import { useContext } from "react";
import { ProductContext } from "context/ProductContext";
import { AlertContext } from "context/AlertContext";

export const useProductContext = () => {
  const values = useContext(ProductContext);
  return values;
};

export const useAlertContext = () => {
  const values = useContext(AlertContext);
  return values;
};
