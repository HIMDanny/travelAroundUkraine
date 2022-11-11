import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TourPage, HomePage, CartPage, CataloguePage, ErrorPage, CheckoutPage, ContactsPage  } from './pages';
import Layout from './layout/Layout/Layout';

// TODO: add navigation from tour page to catalogue page

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/catalogue" element={<CataloguePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/tour/:tourId" element={<TourPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
