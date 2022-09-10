import { Api } from "./Api";
import { City, Product } from "../common";

class ProductService extends Api {
  private prefix: string = "products";
  constructor() {
    super();
  }
  public async getOne(id: number): Promise<Product[]> {
    return await this.get(`${this.prefix}?id=${id}`);
  }
  public async getBySearchTerm(searchTerm: string): Promise<Product[]> {
    return await this.get(`${this.prefix}?title_like=${searchTerm}`);
  }
  public async getAll(): Promise<Product[]> {
    return await this.get(`${this.prefix}`);
  }
  public async getCities(): Promise<City[]> {
    return await this.get("cities");
  }
  public async create<T extends {}>(data: T): Promise<Product> {
    return await this.post(`${this.prefix}`, data);
  }
  public async edit<T extends {}>(id: number, data: T): Promise<Product> {
    return await this.patch(`${this.prefix}/${id}`, data);
  }
  public async remove<T extends {}>(id: number) {
    return await this.delete(`${this.prefix}/${id}`);
  }
}

export const productService = new ProductService();
