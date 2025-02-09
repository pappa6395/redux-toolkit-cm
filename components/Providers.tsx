"use client"

import store from '@/store/store';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'


const Providers = ({children}: {children: React.ReactNode}) => {

  return (

    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
    />
        {children}
    </Provider>

  )
}

export default Providers