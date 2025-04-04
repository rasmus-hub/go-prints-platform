'use client';

import React from 'react';

import { CartDrawer } from '../Cart/CartDrawer';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}