import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice/index.js";
import adminProductsSlice from "./slices/admin/products-slice/index.js";
import commonFeatureSlice from "./slices/common/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    commonFeature: commonFeatureSlice,

  },
});

export default store;