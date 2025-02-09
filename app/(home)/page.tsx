import { getAllProducts } from '@/action/products'
import ProductList from '@/components/ProductList'
import React from 'react'

const page = async () => {

    const products = await getAllProducts()

  return (

    <div className='m-4 p-4'>
        <ProductList products={products}/>
    </div>

  )
}

export default page