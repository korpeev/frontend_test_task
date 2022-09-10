import { createContext } from "react";
import { AlertContextInitValues } from "../common";
import { AlertOptions } from "../common/other.types";

export const AlertContext = createContext<AlertContextInitValues>({
  alert: {} as AlertOptions,
  closeAlert: () => {},
  openAlert: options => {},
});
