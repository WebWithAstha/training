import { Route, Routes } from "react-router-dom";
import AuthLayout from "../components/auth/layout";
import AuthLogin from "../pages/auth/login";
import AuthRegister from "../pages/auth/register";
import AdminLayout from "../components/admin-view/layout.jsx";
import NotFound from "../components/common/not-found.jsx";
import CheckAuth from "../components/common/check-auth";
import UnauthPage from "../pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "../store/slices/auth-slice/index";
import { Skeleton } from "@/components/ui/skeleton";

import React from 'react'
import ShoppingHome from "@/pages/shopping-view/home";
import ShoppingLayout from "@/components/shopping-view/layout";
import LoadingPage from "@/components/common/loading";
import AdminDashboard from "@/pages/admin-view/dashboard";
import AdminProducts from "@/pages/admin-view/products";
import ShoppingListing from "@/pages/shopping-view/listing";

const AppRoutes = () => {
  const dispatch = useDispatch();
   const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  // console.log(user, isAuthenticated, isLoading);

  // const user= {
  //   name: "John Doe",
  //   email: "a"
  // }
  // const isAuthenticated = true;
  // const isLoading = false;
  // const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <LoadingPage/>;

  // console.log("user : ",user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
           <Route path="dashboard" element={<AdminDashboard />} />
           <Route path="products" element={<AdminProducts />} />
          {/* 
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} /> */}
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          
          <Route path="listing" element={<ShoppingListing />} />
      </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}


export default AppRoutes;