import { useAlertContext } from "hooks/context";
import clsx from "clsx";
import { AlertVariant } from "common/other.types";

export const Alert = () => {
  const { alert, closeAlert } = useAlertContext();
  return (
    <div
      className={clsx(
        "fixed left-1/2 transition-transform -translate-x-1/2 top-0 duration-200",
        {
          "-translate-y-full": !alert.isOpen,
          "translate-y-0": alert.isOpen,
        }
      )}>
      <div
        className={clsx("text-white font-bold rounded-t px-4 py-2", {
          "bg-red-400": alert.variant === AlertVariant.Danger,
          "bg-emerald-400": alert.variant === AlertVariant.Success,
        })}>
        {alert.variant === AlertVariant.Success ? "Success" : "Error"}
      </div>
      <div
        className={clsx("border border-t-0 rounded-b px-4 py-3 ", {
          "bg-red-100 text-red-700": alert.variant === AlertVariant.Danger,
          "bg-emerald-100 text-emerald-700":
            alert.variant === AlertVariant.Success,
        })}>
        <p>{alert.message}</p>
      </div>
    </div>
  );
};
