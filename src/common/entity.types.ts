export interface Product {
  id: number;
  title: string;
  description: string;
  isActive: string;
  price: number | CityProductPrice[] | undefined;
  media: string[];
  onePriceAllCities: boolean;
}

export interface City {
  id: string;
  name: string;
}

export interface CityProductPrice extends City {
  price: number;
}
