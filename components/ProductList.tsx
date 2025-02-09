"use client"

import React from 'react'
import Product from '@/components/Product'
import { IProduct } from '@/types'
import Link from 'next/link'
import { useAppSelector } from '@/store/hooks/hooks'
import CartView from './Cartview'

const ProductList = ({products}: {products: IProduct[]}) => {

    const cartItem = useAppSelector((state) => state.cart.cartItems)

  return (

    <div>
        <h2 className="scroll-m-20 text-gray-800 text-center border-b pb-2 mb-4 text-3xl 
        font-semibold tracking-tight first:mt-0">
            Shopping Cart Redux
        </h2>
        <div className="flex justify-between">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
                Product List ({products.length ?? 0})   
            </h2>
        </div>
        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-9'>
                <Product products={products}/>
            </div>
            <div className='col-span-3'> 
                <CartView />
          </div>
        </div>
    </div>

  )
}

export default ProductList