import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

//contents and layouts
import PageContent from './contents/PageContent';

//auth pages
import Home from "./pages/Home"
import Signup from './pages/auth/Signup';
import Cart from './pages/Cart';
import Signin from './pages/auth/Signin';
import Activate from "./pages/auth/Activate";
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

//admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/CategoryCreate";
import ProductCreate from "./pages/admin/ProductCreate";
import ManageProducts from "./pages/admin/ManageProducts";
import Orders from "./pages/admin/Orders";

//user pages
import UserDashboard from "./pages/user/UserDashboard";
import Wishlist from "./pages/user/Wishlist";
import History from "./pages/user/History";

const Routes = () => {
  return (
    <BrowserRouter>
    <PageContent>
    
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/auth/account/activate/:token" component={Activate} />
        <Route exact path="/auth/password/forgot" component={ForgotPassword} />
        <Route exact path="/auth/password/reset/:token" component={ResetPassword} />

        {/* ADMIN ROUTES */}
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/create/category" component={CategoryCreate} />
        <Route exact path="/admin/create/product" component={ProductCreate} />
        <Route exact path="/admin/manage/products" component={ManageProducts} />
        <Route exact path="/admin/manage/orders" component={Orders} />

        {/* USER ROUTES */}
        {/* TODO UPDATE THE ROUTES */}
        <Route exact path="/user/profile" component={UserDashboard} />
        <Route exact path="/user/wishlist" component={Wishlist} />
        <Route exact path="/user/history" component={History} />

        {/* NOT FOUND PAGE */}
        <Route path='*' exact component={() => <h1>NOT FOUND</h1>} />
      </Switch>
      </PageContent>
    </BrowserRouter>
  );
};

export default Routes;
