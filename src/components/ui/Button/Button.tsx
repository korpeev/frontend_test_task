import {FC, PropsWithChildren} from "react";
import {Props} from "./models";

export const Button:FC<PropsWithChildren<Props>> = ({children, className, ...props}) => {
    return <button {...props} className={`bg-emerald-400 text-white py-2 px-5 font-bold rounded ${className}`}>
        {children}
    </button>
}
