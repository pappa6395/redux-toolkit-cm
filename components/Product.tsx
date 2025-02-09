"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { IProduct } from '@/types'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks'
import { addProductToCart, removeProductFromCart } from '@/slices/cartSlice'
import toast from 'react-hot-toast'

const Product = ({products}: {products: IProduct[]}) => {
   
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.cart.cartItems); // Get cart items from Redux store
    
    //check item if it is in the cart
    const isInCart = (id: number) => cartItems.some((item) => item.id === id)

    const handleAdd = (newCartItems: IProduct) => {
        dispatch(
            addProductToCart({
                id: newCartItems.id,
                title: newCartItems.title,
                price: newCartItems.price,
                description: newCartItems.description,
                category: newCartItems.category,
                image: newCartItems.image,
                rating: newCartItems.rating,
                quantity: 1,
            })
        );
        localStorage.setItem("posItem", JSON.stringify([...cartItems, newCartItems]));
    }
    const handleRemove = (item: IProduct) => {
        dispatch(
            removeProductFromCart(item.id)
        )
        toast.success("item removed successfully")
        localStorage.setItem("cartItem", JSON.stringify(cartItems.filter((item) => item.id!== item.id)))
    }

    

  return (

    <div className='gap-6 grid grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto'>
        {products && products.map((item) => {
            const existing = isInCart(item.id)
            return (
                <div key={item.id} className='w-56 h-auto border py-2 flex flex-col justify-between'>
                    <div className=''>
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={200}
                            height={250}
                            className='aspect-square w-48 h-56 px-2'  
                        />
                        <div className='py-2'>
                            <h3 className='text-xl font-bold text-primary line-clamp-2'>{item.title}</h3>
                            <p className='text-base font-medium text-muted-foreground line-clamp-3'>{item.description}</p>
                        </div>
                    </div>
                    <div>
                    <p className='pb-4'>$ {item.price}</p>
                    {existing ? (
                   <div className='flex justify-between'>
                        <Button 
                        className='border px-4 rounded-full'
                        onClick={() => handleAdd(item)}
                    >
                            <ShoppingBag />
                            Add to Cart
                        </Button>
                        <Button 
                        variant={"destructive"}
                        className='border px-4 rounded-full'
                        onClick={() => handleRemove(item)}
                    >
                        <Trash2 className='size-4'/>
                        <span className='sr-only'>Remove from Cart</span>
                        </Button>
                        
                   </div>
                   
                    
                    ) : (
                        <Button 
                        className='border px-4 rounded-full'
                        onClick={() => handleAdd(item)}
                    >
                            <ShoppingBag />
                            Add to Cart
                        </Button>
                    )}
                    </div>
                </div>
            )
        })}
    </div>

  )
}

export default Product