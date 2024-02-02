export type IHoverOnMouse = 'right' | 'left' | null;

export type IStage = 'swipe' | 'view';

export interface ICity {
  city_id: string;
  country_id: string;
  slug: string;
  city_1c_guid: string;
  city_magento_id: string;
  city_name: {
    En: string;
    Kz: string;
    Ru: string;
  };
  title: string;
  last_update: string;
  city_code: string;
  post_code: string;
  geo_position: {
    latitude: number;
    longitude: number;
  };
  is_active: boolean;
  map_available: boolean;
  city_tds: string;
  city_catf: string;
  time_zone: number;
}

export interface ICityList {
  cities: ICity[];
}

export interface IPromocodeTinder {
  sku: string;
  promocode: string;
  discount: number;
}

export interface IProductRaw {
  categories: string[];
  images: string[];
  price: string;
  title: string;
  sku: string;
  uri: string;
}

export interface IProductsRequest {
  payload: IProductRaw[];
}

export interface IProduct {
  newPrice: string;
  discountPercentage: string;
  categories: string[];
  image: string;
  oldPrice: number;
  title: string;
  sku: string;
  uri: string;
  promocode: string;
  discount: number;
}
