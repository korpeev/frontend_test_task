import {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  useTransition,
} from "react";
import { AlertContext } from "../context/AlertContext";
import {
  AlertOptions,
  AlertPosition,
  AlertVariant,
} from "../common/other.types";

const alertInitialState = {
  isOpen: false,
  variant: AlertVariant.Danger,
  interval: 500,
  position: AlertPosition.TopRight,
  message: "",
};
export const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
  const [alert, setAlert] = useState<AlertOptions>(alertInitialState);
  const [_, startTransition] = useTransition();
  useEffect(() => {
    if (alert.isOpen) {
      startTransition(() => {
        setTimeout(() => {
          closeAlert();
        }, alert.interval);
      });
    }
  }, [alert]);
  const closeAlert = () => {
    setAlert(alertInitialState);
  };
  const openAlert = (options: AlertOptions) => {
    setAlert(options);
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
        closeAlert,
        openAlert,
      }}>
      {children}
    </AlertContext.Provider>
  );
};
