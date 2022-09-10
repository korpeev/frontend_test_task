export class Api {
  private uri: string = import.meta.env.VITE_API_URL;

  protected async get(endpoint?: string) {
    const response = await fetch(`${this.uri}${endpoint}`);
    return await response.json();
  }

  protected async post<T extends Record<string, unknown>>(
    endpoint: string,
    data: T
  ) {
    const response = await fetch(`${this.uri}${endpoint}`, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    return await response.json();
  }
  protected async patch<T extends Record<string, unknown>>(
    endpoint: string,
    data: T
  ) {
    const response = await fetch(`${this.uri}${endpoint}`, {
      body: JSON.stringify(data),
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
    });
    return await response.json();
  }
  protected async delete(endpoint: string) {
    const response = await fetch(`${this.uri}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    return await response.json();
  }
}
