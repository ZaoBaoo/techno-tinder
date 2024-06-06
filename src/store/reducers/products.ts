import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../utils/API';
import { IProduct } from '../../types';
import { ALMATY_CITY_ID } from '../../constants';
import { transformNumberToString } from '../../utils/transformNumberToString';

interface IProductsState {
  isProductsRequest: boolean;
  isRepeatedRequest: boolean;
  products: IProduct[];
}

const initialState: IProductsState = {
  isProductsRequest: true,
  isRepeatedRequest: false,
  products: [],
};

export const fetchProducts = createAsyncThunk('products/fetchData', async () => {
  const cityList = await API.getCityList();

  const magentoId = JSON.parse(localStorage.getItem('cityMagentoId')!)?.data;

  const cityId = cityList.cities.find((city) => city.city_magento_id === magentoId)?.city_id || ALMATY_CITY_ID;

  const promocodes = await API.getPromocodes(cityId);

  const productsSkus = promocodes.map((item) => item.sku);

  const productsRaw = await API.getProducts(cityId, productsSkus);

  const productsModified = productsRaw.payload.map((product) => ({
    categories: product.categories || [],
    image: `https://api.technodom.kz/f3/api/v1/images/1080/1080/${product.images[0]}.jpg`,
    oldPrice: +product.price || 0,
    title: product.title,
    sku: product.sku,
    uri: product.uri,
  }));

  const mergeProducts = promocodes
    .map((promocode) => ({
      ...promocode,
      ...productsModified.find((item2) => item2.sku === promocode.sku)!,
    }))
    .filter((promocode) => Boolean(promocode.title));

  const mergeProductsModified: IProduct[] = mergeProducts.map((product) => ({
    ...product,
    newPrice: Math.round(product.oldPrice - product.oldPrice * product.discount).toString(),
    discountPercentage: transformNumberToString(product.discount),
  }));

  return mergeProductsModified;
});

export const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setIsRepeatedRequest: (state, action: PayloadAction<boolean>) => {
      state.isRepeatedRequest = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isProductsRequest = false;
      state.isRepeatedRequest = false;
      state.products.push(...action.payload);
    });
  },
});

const { actions, reducer } = slice;

export const { setIsRepeatedRequest } = actions;

export default reducer;
