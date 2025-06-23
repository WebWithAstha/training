import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice/index.js";
import adminProductsSlice from "./slices/admin/products-slice/index.js";
import commonFeatureSlice from "./slices/common/index.js";
import shopProductsSlice from "./slices/shop/products-slice/index.js";
import shopCartSlice from "./slices/shop/cart-slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    commonFeature: commonFeatureSlice,
     shopProducts: shopProductsSlice,
     shopCart: shopCartSlice,

  },
});

export default store;