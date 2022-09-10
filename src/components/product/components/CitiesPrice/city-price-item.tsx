import { CityProductPrice } from "common/entity.types";
import {
  ChangeEvent,
  Dispatch,
  FC,
  FocusEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useDebounce from "hooks/useDounce";

interface Props {
  city: CityProductPrice;
  setCities: Dispatch<SetStateAction<CityProductPrice[]>>;
}

export const CityPriceItem: FC<Props> = ({ city, setCities }) => {
  const [price, setPrice] = useState<string>(city.price.toString());
  const debounceValue = useDebounce<string>(price, 500);
  const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.validity.valid) {
      setPrice(event.target.value);
    }
  };
  useEffect(() => {
    setCities((prev) =>
      prev.map((cityFromRoot) => {
        return cityFromRoot.id === city.id
          ? { ...cityFromRoot, price: Number(debounceValue) }
          : cityFromRoot;
      })
    );
  }, [debounceValue]);
  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value.length === 1 && +event.target.value === 0)
      setPrice("");
  };
  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value === "") setPrice("0");
  };
  return (
    <li
      key={city.id}
      className="flex items-center justify-between border-b-2 border-gray-400 py-3">
      <span className="w-1/2">{city.name}</span>
      <input
        onChange={onChangePrice}
        onFocus={onFocus}
        onBlur={onBlur}
        value={price}
        type="text"
        pattern="[0-9]*"
        className="border-2 w-1/2"
      />
    </li>
  );
};
