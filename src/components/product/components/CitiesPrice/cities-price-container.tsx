import { FC } from "react";

import { CityPriceItem } from "components/product/components/CitiesPrice/city-price-item";
import { useProductContext } from "hooks/context";

export const CitiesPriceContainer: FC = () => {
  const { cities, setCities } = useProductContext();
  return (
    <div className="mt-5">
      <ul>
        <li className="flex items-center justify-between border-b-2 border-gray-400 py-3">
          <span className="w-1/2">Город</span>{" "}
          <span className="justify-start w-1/2">Цена</span>
        </li>
        {cities.map((city) => (
          <CityPriceItem city={city} setCities={setCities} />
        ))}
      </ul>
    </div>
  );
};
