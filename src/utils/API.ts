import { BASE_URL } from '../constants';
import { ICityList, IProductsRequest, IPromocodeTinder } from '../types';

export class API {
  static getCityList(): Promise<ICityList> {
    return new Promise((resolve, reject) => {
      fetch('https://api.technodom.kz/config-discovery/api/v1/cities')
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  static getPromocodes(cityId: string): Promise<IPromocodeTinder[]> {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}technodom/product/new_year_2023?city_id=${cityId}`)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  static getProducts(cityId: string, arraySkus: string[]): Promise<IProductsRequest> {
    return new Promise((resolve, reject) => {
      fetch('https://api.technodom.kz/katalog/api/v1/products/landings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skus: arraySkus,
          city_id: cityId,
          limit: 10,
          page: 1,
        }),
      })
        .then((data) => data.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

export const api = new API();
